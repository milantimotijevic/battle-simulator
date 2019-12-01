const { parentPort, workerData } = require('worker_threads');
const helpers = require('./helpers');
const fetchAllArmies = require('../queries/army/fetchAllArmies');
const findOneArmy = require('../queries/army/findOneArmy');
const updateArmy = require('../commands/army/updateArmy');
const registerDamage = require('../commands/army/registerDamage');
const announce = require('../commands/battle/announce');
const format = require('../../../util/message-formatter');


/**
 * Initialize this worker so it knows exactly which army/battle it is related to
 */
let { thisArmy } = workerData;
const { battle } = workerData;
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
 * TODO handle defeat-checking better
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
		await new Promise(resolve => setTimeout(resolve, helpers.getMilliseconds(reload)));
	}
};

/**
 * Instructs the army to check its status and reload/attack if needed
 * TODO clean this up, it's getting bloated
 */
commands.takeTurn = async function takeTurn() {
	await getLatestData();
	if (thisArmy.defeated) {
		return;
	}

	await reloadIfNeeded();

	// Checking again because the army might have been defeated while reloading
	await getLatestData();
	if (thisArmy.defeated) {
		return;
	}

	const target = helpers.selectTarget(thisArmy.strategy, opponents);
	announce(`${format(thisArmy)} targets ${format(target)}`);

	if (helpers.isSuccessfulHit(thisArmy.units)) {
		const damage = helpers.calculateDamage();
		console.log(`NOTE: --- Registering ${damage} damage to ${target.name} in DB...`);
		registerDamage(battle, target, damage);
		msg += ` and lands a successful hit, dealing ${damage} damage!`;
	} else {
		msg += ' but fails to land a hit!';
	}

	console.log(msg);
	const reload = helpers.calculateReload(thisArmy.currentUnits);
	await updateArmy(thisArmy.id, { reload });

	this.takeTurn();
};
