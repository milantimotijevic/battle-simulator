const Boom = require('@hapi/boom');
const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function getBattleLog(id) {
	const battle = BattleRepository.getBattleLog(id);

	if (!battle) {
		throw Boom.notFound(`Battle with ID ${id} not found`);
	}
	return battle.log ? battle.log : [];
};
