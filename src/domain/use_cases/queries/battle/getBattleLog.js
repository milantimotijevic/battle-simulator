const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = function getBattleLog(id) {
	return BattleRepository.getBattleLog(id);
};
