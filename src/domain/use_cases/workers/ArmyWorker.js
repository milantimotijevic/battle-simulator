const helpers = require('./helpers');
const fetchAllArmies = require('../queries/army/fetchAllArmies');
const findOneArmy = require('../queries/army/findOneArmy');
const updateArmy = require('../commands/army/updateArmy');
const registerDamage = require('../commands/army/registerDamage');
const announce = require('../commands/battle/announce');
const { format } = require('./helpers');

function ArmyWorker(army, battleName) {
	this.army = army;
	this.battle = { id: this.army.battle, name: battleName };

	// It makes it easier to call announce without needing to pass the exact same battle every single time
	this.announce = announce.bind(this, this.battle);
	this.opponents = [];

	/**
	 * Gets latest army data from DB
	 */
	this.getLatestData = async () => {
		this.army = await findOneArmy(this.id);
		if (this.army.defeated) {
			return;
		}
		this.opponents = await fetchAllArmies(
			{ filters: { defeated: false, battle: this.battle.id }, excludeId: this.army.id }
		);
	};

	/**
	 * Check whether this army needs to reload and then get hacky with Promises!
	 */
	this.reloadIfNeeded = async () => {
		const { reload } = this.army;
		if (this.army.reload) {
			announce(`${format(this.army)} begins to reload (${this.army.reload} sec.)`);
			await new Promise(resolve => setTimeout(resolve, helpers.getMilliseconds(reload)));
			await updateArmy(this.army.id, { reload: 0 });
			announce(`${format(this.army)} finishes reloading`);
		}
	};


	/**
	 * Instructs the army to check its status, reload if needed and initiate the attack sequence
	 */
	this.takeTurn = async () => {
		await this.getLatestData();
		if (this.army.defeated) {
			// TODO handle killing
			return;
		}

		await this.reloadIfNeeded();

		// Checking again because the army might have been defeated while reloading
		await this.getLatestData();
		if (this.army.defeated) {
			// TODO handle killing
			return;
		}

		await this.attemptToAttack();
	};

	/**
	 * Instructs the army to select a target and attempt to perform an attack
	 */
	this.attemptToAttack = async () => {
		const target = helpers.selectTarget(this.army.strategy, this.opponents);
		announce(`${format(this.army)} targets ${format(target)}`);

		if (helpers.isSuccessfulHit(this.army.currentUnits)) {
			const damage = helpers.calculateDamage(this.army.currentUnits);
			announce(`${format(this.army)} lands a successful hit on ${format(target)} for ${damage} damage`);
			registerDamage(this.battle, target, damage);
		} else {
			announce(`${format(this.army)} fails to hit ${format(target)}`);
		}

		const reload = helpers.calculateReload(this.army.currentUnits);
		await updateArmy(this.army.id, { reload });

		await this.takeTurn();
	};
}

module.exports = ArmyWorker;
