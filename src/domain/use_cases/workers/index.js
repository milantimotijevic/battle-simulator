const { Worker } = require('worker_threads');

let armyWorkersStorage = [];

for (let i = 0; i < armyWorkersStorage.length; i++) {
	armyWorkersStorage[i].postMessage({ commandName: 'takeTurn', commandParams: armies });
}

const createWorkers = async function createWorkers(battle) {
	battle.armies.forEach((army) => {
		const worker = new Worker('./worker.js', { workerData: { thisArmy: army, battle } });
		// worker.on('message', message => {
		//    console.log(message);
		// });
		armyWorkersStorage.push({ worker, armyId: army.id });
	});

	armyWorkersStorage.forEach((armyWorker) => {
		armyWorker.postMessage({ commandName: 'takeTurn' });
	});
};

const findWorkerByArmyId = function findWorkerByArmyId(armyId) {
	return armyWorkersStorage.find(worker => worker.armyId === armyId);
};

/**
 * Kills a worker and removes it from the array
 */
const terminateWorkerByArmyId = function terminateWorkerByArmyId(armyId) {
	const worker = findWorkerByArmyId(armyId);
	armyWorkersStorage = armyWorkersStorage.filter(item => item === worker);
};

module.exports = {

};
