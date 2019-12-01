const { parentPort, workerData } = require('worker_threads');
const helpers = require('./helpers');
const getBattleParticipants = require('../queries/battle/getBattleParticipants');
const updateArmy = require('../commands/army/updateArmy');

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
 */
const getLatestData = async function getLatestData() {
	const armies = await getBattleParticipants(battleId);
	opponents = [];
	armies.forEach((army) => {
		if (army.id === thisArmy.id) {
			thisArmy = army;
		} else {
			opponents.push(army);
		}
	});

	if (thisArmy.defeated) {
		console.log(`${thisArmy.name} has been defeated`);

	}
};

commands.takeTurn = async function takeTurn(armies) {
	await getLatestData();
	// TODO reload
	await getLatestData();

	if (thisArmy.defeated) {

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
};
