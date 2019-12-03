const Boom = require('@hapi/boom');
const updateBattle = require('./updateBattle');
const findOneBattle = require('../../queries/battle/findOneBattle');
const startWorkers = require('../army/startWorkers');
const announce = require('./announce');
const getOngoingBattles = require('../../queries/battle/getOngoingBattles');

const FRESH = 'FRESH';
const POST_RESET = 'POST_RESET';
const RESUMED = 'RESUMED';

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

	if (ongoingBattles.length >= process.env.MAX_BATTLES) {
		throw Boom.badRequest(`There are already ${process.env.MAX_BATTLES} (maximum) ongoing battles`);
	}

	if (battle.armies.length < process.env.MIN_ARMIES) {
		throw Boom.badRequest(
			`The battle only has ${battle.armies.length} participating armies. It needs at least ${process.env.MIN_ARMIES}`
		);
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
		startType = recentlyReset ? POST_RESET : FRESH;
	} else {
		startType = RESUMED;
	}

	const updatePayload = { status: 'ONGOING', recentlyReset: false };

	/**
	 * A reset battle will store information on its being reset in the log, as well as (potentially) a few other
	 * lines. The latter is because announce method rarely gets awaited (to avoid incurring unnecessary delay)
	 * However, since we are now performing a fresh start, we want to purge all other information
	 */
	if (startType === POST_RESET) {
		updatePayload.log = [];
	}

	battle = await updateBattle(battle.id, updatePayload);

	if (startType === POST_RESET || startType === FRESH) {
		await announce(battle, 'BATTLE NOW STARTING...');
	} else {
		await announce(battle,
			'RESUME COMMAND HAS BEEN ISSUED. We will not duplicate the workers, do not worry!');
	}

	startWorkers(battle, startType);
	return battle;
};
