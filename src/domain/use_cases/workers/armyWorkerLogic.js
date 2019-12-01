const { parentPort, workerData } = require('worker_threads');
const helpers = require('./helpers');
const fetchAllArmies = require('../queries/army/fetchAllArmies');
const findOneArmy = require('../queries/army/findOneArmy');

/**
 * Initialize this worker so it knows exactly which army/battle it is related to
 */
let { thisArmy } = workerData;
const { battleId } = workerData;
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
 * TODO handle defeat checking better
 */
const getLatestData = async function getLatestData() {
	thisArmy = await findOneArmy(thisArmy.id);
	if (thisArmy.defeated) {
		return;
	}
	opponents = await fetchAllArmies({ filters: { defeated: false }, excludeId: thisArmy.id });
	opponents = [];
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

commands.takeTurn = async function takeTurn(armies) {
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

	const target = helpers.selectTarget(armies);
	let msg = `${thisArmy.name} targets ${target.name}`;

	if (helpers.isSuccessfulHit()) {
		const damage = helpers.calculateDamage();
		console.log(`NOTE: --- Registering ${damage} damage to ${target.name} in DB...`);
		msg += ` and lands a successful hit, dealing ${damage} damage!`;
	} else {
		msg += ' but fails to land a hit!';
	}

	console.log(msg);
	// remember to set reload
	// remember to call takeTurn again
};
