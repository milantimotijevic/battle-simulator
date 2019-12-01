const { Worker, parentPort } = require('worker_threads');

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

const workers = [];
for (let i = 0; i < armies.length; i++) {
	const worker =
		new Worker('./worker.js', { workerData: {thisArmy: armies[i], battleId: battle.id} });
	// worker.on('message', message => {
	//    console.log(message);
	// });
	workers.push(worker);
}

for (let i = 0; i < workers.length; i++) {
	workers[i].postMessage({commandName: 'takeTurn', commandParams: armies});
}
