const Boom = require('@hapi/boom');
const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function findOneBattle(id) {
	const battle = await BattleRepository.findOne(id);
	if (!battle) {
		throw Boom.notFound(`Battle with ID ${id} not found`);
	}
	return battle;
};
