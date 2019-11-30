const BattleRepository = require('../../../../repository/BattleRepository');

/**
 * Updates a single battle by its ID
 * Allows passing of various properties to be updated
 * Only the properties specified will be affected
 */
module.exports = async function updateBattle(id, props) {
	return BattleRepository.updateBattle(id, props);
};
