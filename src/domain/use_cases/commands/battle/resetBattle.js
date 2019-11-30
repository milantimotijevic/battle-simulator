const Boom = require('@hapi/boom');
const ArmyRepository = require('../../../../repository/ArmyRepository');
const updateBattle = require('./updateBattle');
const stopWorkers = require('./../army/stopWorkers');
const findOneBattle = require('../../queries/battle/findOneBattle');

/**
 * Resets an ONGOING battle by
 * 1. Stopping all army workers,
 * 2. Resetting armies to their starting values (unit count, defeated state, reload),
 * 3. Changing battle status
 *
 * Once reset, the battle will return to PENDING state and can be started again using the relevant endpoint
 * In case this method also needs to start the battle after resetting the values, it can simply call the startBattle
 * method after it does its thing
 */
module.exports = async function resetBattle(battleId) {
	const battle = await findOneBattle(battleId);
	if (battle.status !== 'ONGOING') {
		throw Boom.badRequest(`Battle is in status ${battle.status}. Only ONGOING battles can be reset`);
	}
	await stopWorkers(battle.armies);
	await ArmyRepository
		.updateMultipleArmies(battle.armies, { currentUnits: '$units', defeated: false, reload: 0 });
	return updateBattle(battle.id, { logs: [], status: 'PENDING' });
};
