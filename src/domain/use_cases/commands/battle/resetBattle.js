const BattleRepository = require('../../../../repository/BattleRepository');
const ArmyRepository = require('../../../../repository/ArmyRepository');
const updateBattle = require('./updateBattle');
const stopWorkers = require('./../army/startWorkers');

module.exports = async function resetBattle(battleId) {
	const battle = await BattleRepository.findOne(battleId);
	// TODO validate battle
	await stopWorkers(battle.armies);
	await ArmyRepository
		.updateMultipleArmies(battle.armies, { currentUnits: '$units', defeated: false, reload: 0 });
	return updateBattle(battle.id, { logs: [], status: 'PENDING' });
};
