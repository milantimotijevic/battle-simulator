const { parentPort, workerData } = require('worker_threads');
const helpers = require('./helpers');

/**
 * Initialize this worker so it knows exactly which army/battle it is related to
 */
let { thisArmy } = workerData;
const { battleId } = workerData;

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

commands.takeTurn = async function takeTurn(armies) {
	// TODO reload
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
};

/**
 * Gets latest army data from DB
 */
const getLatestData = async function getLatestData() {
	const armies = null;
};
