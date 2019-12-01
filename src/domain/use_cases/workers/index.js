/**
 * Holds a memory storage containing all active workers
 * Also exposes a method for creation and starting of workers
 * Attempting to start a worker for an army that already has an active worker will have no effect (it won't start
 * a new worker)
 */

const { Worker } = require('worker_threads');

let armyWorkersStorage = [];


function findWorkerByArmyId(armyId) {
	return armyWorkersStorage.find(worker => worker.armyId === armyId);
}

/**
 * Disposes of the worker
 */
const terminateWorkerByArmyId = function terminateWorkerByArmyId(armyId) {
	const worker = findWorkerByArmyId(armyId);
	armyWorkersStorage = armyWorkersStorage.filter(item => item === worker);
	worker.kill();
};

/**
 * Creates and runs workers, while also providing methods for killing workers whose armies have been defeated
 * This method expects to receive a battle with undefeated-only armies, however, it will confirm army's status as well
 */
const createAndRunWorkers = function createWorkers(battle) {
	battle.armies.forEach((army) => {
		const worker = new Worker('./worker.js', { workerData: { thisArmy: army, battle } });
		// There is only ever one type of message (to terminate worker)
		worker.on('message', (armyIdMessage) => {
			terminateWorkerByArmyId(armyIdMessage);
		});

		const existingWorker = findWorkerByArmyId(army.id);
		const { defeated } = army;

		if (existingWorker || defeated) {
			// This army either already has an active worker, or it has been defeated
			return;
		}

		armyWorkersStorage.push({ worker, armyId: army.id });
	});

	armyWorkersStorage.forEach((armyWorker) => {
		armyWorker.postMessage('takeTurn');
	});
};

module.exports = {
	createAndRunWorkers,
	terminateWorkerByArmyId,
};
