const BattleRepository = require('../../../../repository/BattleRepository');

/**
 * Fetches a single battle, populates its 'armies' property, then returns only that one property
 */
module.exports = function getBattleParticipants(id) {
	return BattleRepository.getBattleParticipants(id);
};
