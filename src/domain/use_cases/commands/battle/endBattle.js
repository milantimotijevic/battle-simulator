const announce = require('./announce');
const { format } = require('../../../use_cases/workers/helpers');
const updateBattle = require('./updateBattle');
const { terminateWorkers } = require('../../workers');

/**
 * Called when there is only one army left standing in an ongoing battle
 */
module.exports = async function endBattle(battle, victor) {
	announce(battle, `${format(victor)} IS VICTORIOUS!!!`);

	const updatedBattle = await updateBattle(battle.id, { status: 'RESOLVED', victor });
	terminateWorkers(updatedBattle);
};
