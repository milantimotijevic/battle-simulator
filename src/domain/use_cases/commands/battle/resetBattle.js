const Boom = require('@hapi/boom');
const ArmyRepository = require('../../../../repository/ArmyRepository');
const updateBattle = require('./updateBattle');
const stopWorkers = require('./../army/startWorkers');
const findOneBattle = require('../../queries/battle/findOneBattle');

module.exports = async function resetBattle(battleId) {
	const battle = await findOneBattle(battleId);
	// TODO validate battle
	await stopWorkers(battle.armies);
	await ArmyRepository
		.updateMultipleArmies(battle.armies, { currentUnits: '$units', defeated: false, reload: 0 });
	return updateBattle(battle.id, { logs: [], status: 'PENDING' });
};
