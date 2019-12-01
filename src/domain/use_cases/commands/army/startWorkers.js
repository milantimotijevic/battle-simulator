const fetchAllArmies = require('../../queries/army/fetchAllArmies');

/**
 * Starts workers for the armies that should be fighting (i.e. haven't been defeated)
 */
module.exports = async function startWorkers(battleId) {
	// make sure we are working with undefeated armies
	const armies = await fetchAllArmies({ filter: { battle: battleId, defeated: false } });
	armies.forEach((army) => {
		console.log(`Starting worker for army ${army.name} / ${army.id}`);
	});
};
