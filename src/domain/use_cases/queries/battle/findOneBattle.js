const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = function findOneBattle(id) {
	return BattleRepository.findOne(id);
};
