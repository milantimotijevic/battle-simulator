/**
 * Accepts an array of armies and starts workers for the armies that should be fighting (i.e. haven't been defeated)
 */
module.exports = async function startWorkers(armies) {
	// TODO check which workers are running and run them if needed
	armies.forEach((army) => {
		console.log(`Starting worker for army ${army.name} / ${army.id}`);
	});
};
