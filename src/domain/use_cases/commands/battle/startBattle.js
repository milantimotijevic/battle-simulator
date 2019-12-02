const Boom = require('@hapi/boom');
const updateBattle = require('./updateBattle');
const findOneBattle = require('../../queries/battle/findOneBattle');
const startWorkers = require('../army/startWorkers');
const announce = require('./announce');
const getOngoingBattles = require('../../queries/battle/getOngoingBattles');

/**
 * Starts a battle in PENDING status by:
 * 1. Changing battle status (if needed),
 * 2. Initiating army workers
 *
 * It is also possible to call this method on an ONGOING battle, in which case it will simply ensure the army workers
 * are restarted (the ones that need to be running)
 */
module.exports = async function startBattle(id) {
	let battle = await findOneBattle(id);

	if (battle.status === 'RESOLVED') {
		throw Boom.badRequest('This battle has already ended');
	}

	const ongoingBattles = await getOngoingBattles();

	if (ongoingBattles.length >= 5) {
		throw Boom.badRequest('There are already 5 ongoing battles');
	}

	if (battle.armies.length < 10) {
		throw Boom.badRequest(`The battle only has ${battle.armies.length} participating armies. It needs at least 10`);
	}

	/**
     * It is possible for a battle to have started before, but to have had its workers stopped due to application
     * stopping/crashing
     * In this case, we do not need to update its status
     */
	if (battle.status === 'PENDING') {
		await announce(battle, 'BATTLE NOW STARTING...');
		battle = await updateBattle(battle.id, { status: 'ONGOING' });
	} else {
		await announce(battle, 'BATTLE HAS BEEN RESUMED');
	}

	startWorkers(battle);
	return battle;
};
