const Boom = require('@hapi/boom');
const BattleRepository = require('../../../../repository/BattleRepository');

/**
 * Fetches a single battle from the repository by its ID
 * This method handles error throwing in case of a non-existing battle
 * Subsequent methods will need to handle other types of validation (e.g. incorrect status, army count, etc.)
 */
module.exports = async function findOneBattle(id) {
	const battle = await BattleRepository.findOne(id);
	if (!battle) {
		throw Boom.notFound(`Battle with ID ${id} not found`);
	}
	return battle;
};
