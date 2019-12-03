const helpers = require('./helpers');
const fetchAllArmies = require('../queries/army/fetchAllArmies');
const findOneArmy = require('../queries/army/findOneArmy');
const updateArmy = require('../commands/army/updateArmy');
const registerDamage = require('../commands/army/registerDamage');
const announce = require('../commands/battle/announce');
const { format } = require('./helpers');
const getBattleStatus = require('../queries/battle/getBattleStatus');

function ArmyWorker(army, battle, storage) {
	this.army = army;
	this.battle = battle;
	// this flag is used for force-stopping a worker (e.g. when a battle is reset)
	this.stop = false;
	// store a reference to the memory container, so we can easily purge it when killing the worker
	this.storage = storage;

	// It makes it easier to call announce without needing to pass the exact same battle every single time
	this.announce = announce.bind(this, this.battle);
	this.opponents = [];

	/**
	 * Gets latest army data from DB
	 */

	// eslint-disable-next-line consistent-return
	this.getLatestData = async () => {
		const battleStatus = await getBattleStatus(this.battle.id);
		/**
		 * Check if the battle status has been changed in the meantime
		 * If so, we want this worker to terminate its routine
		 * Another method will already have announced battle end and/or this army's defeat
		 */
		if (!battleStatus || battleStatus !== 'ONGOING') {
			return this.terminate();
		}

		try {
			this.army = await findOneArmy(this.army.id);
		} catch (err) {
			console.log(`DB CORRUPTION DETECTED!!! Terminating worker for army ${format(army)}...`);
			return this.terminate();
		}

		if (!this.army || this.army.defeated) {
			return this.terminate();
		}

		this.opponents = await fetchAllArmies({
			onlyUndefeated: true, battle: this.battle.id, excludeId: this.army.id,
		});

		/**
		 * Check if there are no opponents left and set the forceStop flag
		 * Another method will have already announced battle end, we just want to make sure this particular
		 * worker does not start its reload sequence after the victor has been called
		 * Keeping this check in addition to the above one because this one is somewhat more precise
		 */
		if (this.opponents.length === 0) {
			this.terminate();
		}
	};

	/**
	 * Check whether this army needs to reload and then get hacky with Promises!
	 */
	this.reloadIfNeeded = async () => {
		const { reload } = this.army;
		if (this.army.reload) {
			this.announce(`${format(this.army)} begins to reload (${this.army.reload} sec.)`);
			await new Promise(resolve => setTimeout(resolve, helpers.getMilliseconds(reload)));
			await updateArmy(this.army.id, { reload: 0 });
		}
	};


	/**
	 * Instructs the army to check its status, reload if needed and initiate the attack sequence
	 */
	this.takeTurn = async () => {
		await this.getLatestData();
		if (this.stop) {
			return;
		}

		await this.reloadIfNeeded();

		await this.getLatestData();
		if (this.stop) {
			return;
		}

		await this.attemptToAttack();
	};

	/**
	 * Instructs the army to select a target and attempt to perform an attack
	 */
	this.attemptToAttack = async () => {
		const target = helpers.selectTarget(this.army.strategy, this.opponents);
		this.announce(`${format(this.army)} targets ${format(target)}`);

		if (helpers.isSuccessfulHit(this.army.currentUnits)) {
			const damage = helpers.calculateDamage(this.army.currentUnits);
			this.announce(`${format(this.army)} lands a successful hit on ${format(target)} for ${damage} damage`);
			registerDamage(this.battle, target, damage);
		} else {
			this.announce(`${format(this.army)} fails to hit ${format(target)}`);
		}

		const reload = helpers.calculateReload(this.army.currentUnits);
		await updateArmy(this.army.id, { reload });

		await this.takeTurn();
	};

	/**
	 * Sets stop flag to true and ensures the worker is removed from the memory container
	 * takeTurn method will periodically check whether this flag exists and stop execution if so
	 * This is typically called when the army gets defeated, the game is reset, or the army is the sole survivor
	 */
	this.terminate = () => {
		this.stop = true;
		delete this.storage[this.army.id];
	};
}

module.exports = ArmyWorker;
