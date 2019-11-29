const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function updateBattle(id, props) {
	return BattleRepository.updateBattle(id, props);
};
