/**
 * Terminates army workers for armies specified
 * This will typically be called for one army at a time, however, it is possible that the application will later on
 * need to terminate multiple (or even all) army workers
 */
module.exports = async function stopWorkers(armies) {
	// TODO implement (make sure to check whether there is a running worker)
	armies.forEach((army) => {
		console.log(`Stopping worker for army ${army.name} / ${army.id}`);
	});
};
