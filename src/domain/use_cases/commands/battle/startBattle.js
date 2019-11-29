const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function startBattle(id) {
	// TODO initiate workers
	// TODO check battle status
	const battle = await BattleRepository.findOne(id);
	return BattleRepository.startBattle(battle);
};
