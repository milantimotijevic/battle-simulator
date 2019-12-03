/**
 * NOTE: even though I've decided to move away from using worker threads (due to issues with connection pool
 * sharing), I will keep using the term 'worker', because it still crudely represents a thread
 * This file holds a memory storage containing all active workers
 * Also exposes a method for creation and starting of workers
 * Attempting to start a worker for an army that already has an active worker will have no effect (it won't start
 * a new worker)
 */
const ArmyWorker = require('./ArmyWorker');
const { format } = require('./helpers');

const storage = {};


function findWorkerByArmyId(armyId) {
	return storage[armyId];
}

const instantiateWorker = function instantiateWorker(army, battle) {
	return new ArmyWorker(army, {
		id: battle.id,
		name: battle.name,
		armies: battle.armies,
	}, storage);
};

/**
 * Creates and runs workers (calls their relevant method that will keep them looping over actions)
 * Disallows the creation of multiple workers for a single army
 * This method expects to receive a battle with undefeated-only armies, however, it will confirm army's status as well
 * startType tells us the circumstances under which the workers are starting (FRESH, POST_RESET, RESUMED)
 */
const createAndRunWorkers = function createAndRunWorkers(battle, /* startType */) {
	battle.armies.forEach((army) => {
		const existingWorker = findWorkerByArmyId(army.id);
		if (!existingWorker && !army.defeated) {
			const worker = instantiateWorker(army, battle);
			storage[army.id] = worker;
			console.log(`Initiating worker for army ${format(army)}...`);
			worker.takeTurn();
		} else {
			console.log(`Refusing to initiate worker for army ${format(army)}. Worker already running`);
		}
	});
};

module.exports = {
	createAndRunWorkers,
};
