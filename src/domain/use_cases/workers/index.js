const { Worker, parentPort } = require('worker_threads');

const armies = [
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
];

const armyWorkersStorage = [];

const workers = [];
for (let i = 0; i < armies.length; i++) {
	const worker = new Worker('./worker.js', { workerData: armies[i].id });
	// worker.on('message', message => {
	//    console.log(message);
	// });
	workers.push(worker);
}

for (let i = 0; i < workers.length; i++) {
	workers[i].postMessage({commandName: 'takeTurn', commandParams: armies});
}
