/**
 * NOTE: even though I've decided to move away from using worker threads (due to issues with connection pool
 * sharing), I will keep using the term 'worker', because it still crudely represents a thread
 * This file holds a memory storage containing all active workers
 * Also exposes a method for creation and starting of workers
 * Attempting to start a worker for an army that already has an active worker will have no effect (it won't start
 * a new worker)
 */
const ArmyWorker = require('./ArmyWorker');

const storage = {};


function findWorkerByArmyId(armyId) {
	return storage[armyId];
}

/**
 * Checks whether there's at least one worker relevant to this battle inside the storage
 */
function findWorkerByBattleId(battleId) {
	return storage.find(worker => worker.battle.id === battleId);
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
const createAndRunWorkers = function createAndRunWorkers(battle, startType) {
	battle.armies.forEach((army) => {
		const { defeated } = army;
		if (defeated) {
			return;
		}

		let worker;
		if (startType === 'FRESH') {
			worker = instantiateWorker(army, battle);
		} else if (startType === 'POST_RESET') {
			worker = findWorkerByArmyId(army.id);
			if (!worker) {
				// the battle was reset at some point and so was the application, the worker is not in the array
				worker = instantiateWorker(army, battle);
			} else {
				// the worker is already in the array, no need to add it, but we do want to un-block it
				worker.stop = false;
				return;
			}
		} else if (startType === 'RESUMED') {
			worker = findWorkerByArmyId(army.id);
			if (!worker) {
				worker = instantiateWorker(army, battle);
			} else {
				console.log('forcing skip initial')
				// the worker is already running or is defeated; we want to tell it to ignore outside-called takeTurn()
				worker.skipInitial = true;
				return;
			}
		}

		storage[army.id] = worker;
	});

	const keys = Object.keys(storage);
	keys.forEach((key) => {
		storage[key].takeTurn(true);
	});
};

module.exports = {
	createAndRunWorkers,
};
