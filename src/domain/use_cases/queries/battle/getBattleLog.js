const Boom = require('@hapi/boom');
const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function getBattleLog(id) {
	const battleLog = BattleRepository.getBattleLog(id);

	if (!battleLog) {
		throw Boom.notFound(`Battle with ID ${id} not found`);
	}
	return battleLog;
};
