const announce = require('./announce');
const { format } = require('../../../use_cases/workers/helpers');
const updateBattle = require('./updateBattle');

/**
 * Called when there is only one army left standing in an ongoing battle
 * TODO look into cyclic dependency issue which is forcing me to require terminateWorkers inside the method
 */
module.exports = async function endBattle(battle, victor) {
	// eslint-disable-next-line global-require
	const { terminateWorkers } = require('../../workers');
	announce(battle, `${format(victor)} IS VICTORIOUS!!!`);

	terminateWorkers(battle);
	await updateBattle(battle.id, { status: 'RESOLVED', victor });
};
