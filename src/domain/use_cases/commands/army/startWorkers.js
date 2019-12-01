const fetchAllArmies = require('../../queries/army/fetchAllArmies');

/**
 * Starts workers for the armies that should be fighting (i.e. haven't been defeated)
 */
module.exports = async function startWorkers(battle) {
	// ensure we are working with undefeated armies
	battle.armies = await fetchAllArmies({ filter: { battle: battle.id, defeated: false } });
	battle.armies.forEach((army) => {
		console.log(`Starting worker for army ${army.name} / ${army.id}`);
	});
};
