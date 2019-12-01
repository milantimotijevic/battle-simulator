const { Worker } = require('worker_threads');

const battle = {
	id: 1,
	name: 'A nasty one',
	armies: [
		{
			id: 1,
			name: 'Rohan',
			currentUnits: 5000,
		},
		{
			id: 2,
			name: 'Gondor',
			currentUnits: 4000,
		},
		{
			id: 3,
			name: 'Isengard',
			currentUnits: 10000,
		},
	],
};

const armyWorkersStorage = [];
for (let i = 0; i < battle.armies.length; i++) {
	const worker = new Worker('./worker.js', { workerData: { thisArmy: battle.armies[i], battle } });
	// worker.on('message', message => {
	//    console.log(message);
	// });
	armyWorkersStorage.push(worker);
}

for (let i = 0; i < armyWorkersStorage.length; i++) {
	armyWorkersStorage[i].postMessage({ commandName: 'takeTurn', commandParams: armies });
}

const createWorkers = async function createWorkers(battle) {

};

module.exports = {

};
