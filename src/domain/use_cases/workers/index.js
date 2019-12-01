const { Worker } = require('worker_threads');

let armyWorkersStorage = [];

/**
 * Public methods available for calling from worker threads
 */
const commands = {};

const findWorkerByArmyId = function findWorkerByArmyId(armyId) {
	return armyWorkersStorage.find(worker => worker.armyId === armyId);
};

/**
 * Kills a worker and removes it from the array
 */
commands.terminateWorkerByArmyId = function terminateWorkerByArmyId(armyId) {
	const worker = findWorkerByArmyId(armyId);
	armyWorkersStorage = armyWorkersStorage.filter(item => item === worker);
};

const createAndRunWorkers = async function createWorkers(battle) {
	battle.armies.forEach((army) => {
		const worker = new Worker('./worker.js', { workerData: { thisArmy: army, battle } });
		/**
		 * Issues a publicly available command based on msg from main thread
		 */
		worker.on('message', (message) => {
			try {
				commands[message.commandName](message.commandParams);
			} catch (err) {
				console.log(`(Main Thread) Failed to perform command ${message.commandName} for ${army.name}`);
			}
		});

		armyWorkersStorage.push({ worker, armyId: army.id });
	});

	armyWorkersStorage.forEach((armyWorker) => {
		armyWorker.postMessage({ commandName: 'takeTurn' });
	});
};

module.exports = {
	createAndRunWorkers,

};
