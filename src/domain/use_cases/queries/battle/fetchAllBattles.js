const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = function fetchAllBattles() {
	return BattleRepository.fetchAll();
};
