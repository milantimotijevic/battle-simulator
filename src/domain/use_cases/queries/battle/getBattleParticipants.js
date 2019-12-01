const BattleRepository = require('../../../../repository/BattleRepository');

/**
 * Fetches a single battle, populates its 'armies' property, then returns only that one property
 * Allows filtering for undefeated-only armies
 * Idea for improvement: rework the models so battle references are stored in armies, as well as
 * the vice-versa. That way, you can more easily filter for undefeated armies, without needing to do so in
 * app memory
 */
module.exports = async function getBattleParticipants(id, filters = {}) {
	let participants = await BattleRepository.getBattleParticipants(id);
	const { excludeDefeated } = filters;
	if (excludeDefeated) {
		participants = participants.filter(participant => !participant.defeated);
	}
	return participants;
};
