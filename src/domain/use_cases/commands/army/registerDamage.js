const updateArmy = require('../../commands/army/updateArmy');

/**
 * Persists changes to an army's currentUnits count and marks it as defeated if needed
 *
 * We do not want to await this method, nor do we want to await anything called inside it
 * There's no time for that, we have a battle to win, for heck's sake!
 */
module.exports = function registerDamage(army, value) {
	const currentUnits = army.currentUnits - value;
	const defeated = currentUnits < 1;

	if (defeated) {
		// TODO log defeat
	}

	updateArmy(army.id, { currentUnits, defeated });
};
