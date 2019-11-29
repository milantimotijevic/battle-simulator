const BattleRepository = require('../../../../repository/BattleRepository');
const resetArmies = require('../../commands/army/resetArmies');
const updateBattle = require('./updateBattle');
const stopWorkers = require('./../army/startWorkers');

module.exports = async function resetBattle(battleId) {
	const battle = await BattleRepository.findOne(battleId);
	// TODO validate battle
	await stopWorkers(battle.armies);
	await resetArmies(battle.armies);
	return updateBattle(battle.id, { logs: [], status: 'PENDING' });
};
