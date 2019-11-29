const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = function createBattle(battleParam) {
	return BattleRepository.createBattle(battleParam);
};
