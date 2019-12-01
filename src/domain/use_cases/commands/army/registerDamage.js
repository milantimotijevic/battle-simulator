const updateArmy = require('../../commands/army/updateArmy');

/**
 * Persists changes to an army's currentUnits count and marks it as defeated if needed
 */
module.exports = function registerDamage(army, prop, value) {
	const currentUnits = army.currentUnits - value;
	const defeated = currentUnits < 1;

	if (defeated) {
		// TODO log defeat
	}

	return updateArmy(army.id, { currentUnits, defeated });
};
