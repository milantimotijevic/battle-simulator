const { terminateWorkers } = require('../../workers');

/**
 * Terminates all army workers for the relevant battle
 */
module.exports = function stopWorkers(battle) {
	terminateWorkers(battle);
};
