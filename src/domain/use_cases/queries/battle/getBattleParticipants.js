const BattleRepository = require('../../../../repository/BattleRepository');

/**
 * @DEPRECATED - use fetchAllArmies, the models have now been denormalized to support this query
 * TODO make sure this isn't used anywhere and remove it
 */
module.exports = async function getBattleParticipants(id, filters = {}) {
	let participants = await BattleRepository.getBattleParticipants(id);
	const { excludeDefeated } = filters;
	if (excludeDefeated) {
		participants = participants.filter(participant => !participant.defeated);
	}
	return participants;
};
