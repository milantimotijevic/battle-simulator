const updateArmy = require('../../commands/army/updateArmy');
const announce = require('../battle/announce');

/**
 * Persists changes to an army's currentUnits count and marks it as defeated if needed
 */
module.exports = async function registerDamage(battle, army, value) {
	const currentUnits = army.currentUnits - value;
	const defeated = currentUnits < 1;

	if (defeated) {
		announce(battle, `Army ${army.name} (${army.id}) has been defeated!`);
	}

	await updateArmy(army.id, { currentUnits, defeated });
};
