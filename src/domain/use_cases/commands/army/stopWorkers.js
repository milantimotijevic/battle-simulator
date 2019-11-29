
module.exports = async function stopWorkers(armies) {
	// TODO implement (make sure to check whether there is a running worker)
	armies.forEach((army) => {
		console.log(`Stopping worker for army ${army.name} / ${army.id}`);
	});
};
