const Boom = require('@hapi/boom');
const updateBattle = require('./updateBattle');
const findOneBattle = require('../../queries/battle/findOneBattle');
const updateArmy = require('../army/updateArmy');
const announce = require('./announce');

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
	let battle = await findOneBattle(battleId);
	if (battle.status !== 'ONGOING') {
		throw Boom.badRequest(`Battle is in status ${battle.status}. Only ONGOING battles can be reset`);
	}

	/**
     * Apparently, self-referencing is not possible in mongoose's updateMany method
	 * TODO find a better way to reset armies, one that does not include looping over them
     */
	// await ArmyRepository
	// 	.updateMultipleArmies(battle.armies, { currentUnits: '$units', defeated: false, reload: 0 });

	/**
	 * The requirements did not specifically state anything about battle logs upon reset, however, I assumed we did NOT
	 * want to preserve them. We will, however, temporarily store information that the battle has been reset, with
	 * a small chance of a few other lines slipping inside the log as well.
	 * Starting this game later on will cause the log to be fully reset.
	 */
	battle = await updateBattle(battle.id, { log: [], status: 'PENDING', recentlyReset: true });
	announce(battle, 'THE BATTLE HAS BEEN RESET. ROLLING BACK...');

	battle.armies.forEach(async (army) => {
		await updateArmy(army.id, { currentUnits: army.units, defeated: false, reload: 0 });
	});
	return battle;
};
