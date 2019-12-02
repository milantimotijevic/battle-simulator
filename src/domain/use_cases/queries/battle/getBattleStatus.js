const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = function getBattleStatus(id) {
	return BattleRepository.getBattleStatus(id);
};
