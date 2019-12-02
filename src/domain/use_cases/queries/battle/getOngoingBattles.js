const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = function getOngoingBattles() {
	return BattleRepository.getOngoingBattles();
};
