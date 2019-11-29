const BattleRepository = require('../../../../repository/BattleRepository');
const resetArmies = require('../../commands/army/resetArmies');

module.exports = async function createBattle(battleId) {
	const battle = await BattleRepository.findOne(battleId);
	// TODO extract armies and reset their unit count
	// TODO check battle status
	// TODO ensure these are IDs
	await resetArmies(battle.armies);
	return BattleRepository.resetBattle(battle);
};
