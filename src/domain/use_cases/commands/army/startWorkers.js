const fetchAllArmies = require('../../queries/army/fetchAllArmies');
const { createAndRunWorkers } = require('../../workers');

/**
 * Starts workers for the armies that should be fighting (i.e. haven't been defeated)
 */
module.exports = async function startWorkers(battle) {
	// ensure we are working with undefeated armies only
	battle.armies = await fetchAllArmies({ filter: { battle: battle.id, defeated: false } });

	try {
		createAndRunWorkers(battle);
	} catch (err) {
		console.log(err)
	}
};
