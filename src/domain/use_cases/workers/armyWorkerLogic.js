const { parentPort, workerData } = require('worker_threads');
const helpers = require('./helpers');
const fetchAllArmies = require('../queries/army/fetchAllArmies');
const findOneArmy = require('../queries/army/findOneArmy');
const updateArmy = require('../commands/army/updateArmy');
const registerDamage = require('../commands/army/registerDamage');
let announce = require('../commands/battle/announce');
const { format } = require('./helpers');


/**
 * Initialize this worker so it knows exactly which army/battle it is related to
 */
let { thisArmy } = workerData;
const { battle } = workerData;

// It makes it easier to call announce without needing to pass the exact same battle every single time
announce = announce.bind(this, battle);

let opponents;

/**
 * Public methods available for calling from main thread
 */
const commands = {};

/**
 * Issues a publicly available command based on msg from main thread
 */
parentPort.on('message', (message) => {
	try {
		commands[message.commandName](message.commandParams);
	} catch (err) {
		console.log(`Failed to perform command ${message.commandName} for ${thisArmy.name}`);
	}
});

/**
 * Gets latest army data from DB
 */
const getLatestData = async function getLatestData() {
	thisArmy = await findOneArmy(thisArmy.id);
	if (thisArmy.defeated) {
		return;
	}
	opponents = await fetchAllArmies(
		{ filters: { defeated: false, battle: battle.id }, excludeId: thisArmy.id }
	);
};

/**
 * Check whether this army needs to reload and then get hacky with Promises!
 */
const reloadIfNeeded = async function reloadIfNeeded() {
	const { reload } = thisArmy;
	if (thisArmy.reload) {
		announce(`${format(thisArmy)} begins to reload (${thisArmy.reload} sec.)`);
		await new Promise(resolve => setTimeout(resolve, helpers.getMilliseconds(reload)));
		await updateArmy(thisArmy.id, { reload: 0 });
		announce(`${format(thisArmy)} finishes reloading`);
	}
};

/**
 * Instructs the army to select a target and attempt to perform an attack
 */
const attemptToAttack = async function attemptToAttack() {
	const target = helpers.selectTarget(thisArmy.strategy, opponents);
	announce(`${format(thisArmy)} targets ${format(target)}`);

	if (helpers.isSuccessfulHit(thisArmy.currentUnits)) {
		const damage = helpers.calculateDamage();
		announce(`${format(thisArmy)} lands a successful hit on ${format(target)} for ${damage} damage`);
		registerDamage(battle, target, damage);
	} else {
		announce(`${format(thisArmy)} fails to hit ${format(target)}`);
	}

	const reload = helpers.calculateReload(thisArmy.currentUnits);
	await updateArmy(thisArmy.id, { reload });

	await commands.takeTurn();
};

/**
 * Instructs the army to check its status, reload if needed and initiate the attack sequence
 */
commands.takeTurn = async function takeTurn() {
	await getLatestData();
	if (thisArmy.defeated) {
		// TODO kill the worker
		return;
	}

	await reloadIfNeeded();

	// Checking again because the army might have been defeated while reloading
	await getLatestData();
	if (thisArmy.defeated) {
		// TODO kill the worker
		return;
	}

	await attemptToAttack();
};
