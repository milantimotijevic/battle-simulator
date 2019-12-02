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
	 * A battle can be started due to:
	 * 1. A fresh start,
	 * 2. A resumed start (someone had killed the app), or
	 * 3. A post-reset start
	 * This info is useful when handling the workers
	 */
	let startType;
	const { recentlyReset } = battle;

	if (battle.status === 'PENDING') {
		startType = recentlyReset ? 'POST_RESET' : 'FRESH';
		await announce(battle, 'BATTLE NOW STARTING...');
	} else {
		startType = 'RESUMED';
		await announce(battle,
			'RESUME COMMAND HAS BEEN ISSUED. We will not duplicate the workers, do not worry!');
	}

	battle = await updateBattle(battle.id, { status: 'ONGOING', recentlyReset: false });

	startWorkers(battle, startType);
	return battle;
};
