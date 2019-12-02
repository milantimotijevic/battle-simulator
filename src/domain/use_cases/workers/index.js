/**
 * NOTE: even though I've decided to move away from using worker threads (due to issues with connection pool
 * sharing), I will keep using the term 'worker', because it still crudely represents a thread
 * This file holds a memory storage containing all active workers
 * Also exposes a method for creation and starting of workers
 * Attempting to start a worker for an army that already has an active worker will have no effect (it won't start
 * a new worker)
 */
const ArmyWorker = require('./ArmyWorker');

const armyWorkersStorage = [];


function findWorkerByArmyId(armyId) {
	return armyWorkersStorage.find(worker => worker.army.id === armyId);
}

/**
 * Creates and runs workers (calls their relevant method that will keep them looping over actions)
 * Disallows the creation of multiple workers for a single army
 * This method expects to receive a battle with undefeated-only armies, however, it will confirm army's status as well
 */
const createAndRunWorkers = function createAndRunWorkers(battle) {
	battle.armies.forEach((army) => {
		// no need to pass around the entire battle object, those 3 properties will do
		const worker = new ArmyWorker(army, {
			id: battle.id,
			name: battle.name,
			armies: battle.armies,
		});

		const existingWorker = findWorkerByArmyId(army.id);
		const { defeated } = army;

		if (existingWorker || defeated) {
			// This army either already has an active worker, or it has been defeated
			return;
		}

		armyWorkersStorage.push(worker);
	});

	armyWorkersStorage.forEach((armyWorker) => {
		armyWorker.takeTurn();
	});
};

module.exports = {
	createAndRunWorkers,
};
