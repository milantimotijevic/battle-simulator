const BattleRepository = require('../../../../repository/BattleRepository');
const resetArmies = require('../../commands/army/resetArmies');
const updateBattle = require('./updateBattle');

module.exports = async function resetBattle(battleId) {
	let battle = await BattleRepository.findOne(battleId);
	// TODO extract armies and reset their unit count
	// TODO check battle status
	// TODO ensure these are IDs
	await resetArmies(battle.armies);
	battle = await updateBattle(battle.id, { logs: [] });
};
