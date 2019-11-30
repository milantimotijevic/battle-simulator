const Boom = require('@hapi/boom');
const ArmyRepository = require('../../../../repository/ArmyRepository');
const updateBattle = require('./updateBattle');
const stopWorkers = require('./../army/startWorkers');
const findOneBattle = require('../../queries/battle/findOneBattle');

/**
 * Resets an ONGOING battle by
 * 1. Stopping all army workers,
 * 2. Resetting armies to their starting values (unit count, defeated state, reload),
 * 3. Changing battle status
 */
module.exports = async function resetBattle(battleId) {
	const battle = await findOneBattle(battleId);
	if (battle.status !== 'ONGOING') {
		throw Boom.badRequest('Only ONGOING battles can be reset');
	}
	await stopWorkers(battle.armies);
	await ArmyRepository
		.updateMultipleArmies(battle.armies, { currentUnits: '$units', defeated: false, reload: 0 });
	return updateBattle(battle.id, { logs: [], status: 'PENDING' });
};
