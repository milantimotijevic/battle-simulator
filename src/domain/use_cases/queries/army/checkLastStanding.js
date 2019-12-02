const fetchAllArmies = require('./fetchAllArmies');
const endBattle = require('../../commands/battle/endBattle');

/**
 * Checks whether a specific battle has only one undefeated army left
 */
module.exports = async function checkLastStanding(battle) {
	const undefeatedArmies = await fetchAllArmies({
		onlyUndefeated: true, battle: battle.id,
	});

	if (undefeatedArmies.length === 1) {
		endBattle(battle, undefeatedArmies[0]);
	}
};
