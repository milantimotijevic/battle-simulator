const { parentPort, workerData } = require('worker_threads');
const helpers = require('./helpers');

const id = workerData;
let thisArmy;
let opponents;

/**
 * Public methods available to be called from the main thread
 */
const commands = {};

parentPort.on('message', (message) => {
	try {
		commands[message.commandName](message.commandParams);
	} catch (err) {
		console.log(`Failed to perform command ${message.commandName} for ${army.name}`);
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

const updateArmies = function updateArmies() {

};
