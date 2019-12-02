const fetchAllArmies = require('./fetchAllArmies');
const announce = require('../../commands/battle/announce');
const { format } = require('../../workers/helpers');
const { terminateWorkers } = require('../../workers/workerHandler');
const updateBattle = require('../../commands/battle/updateBattle');

/**
 * Checks whether a specific battle has only one undefeated army left
 */
module.exports = async function checkLastStanding(battle) {
	const undefeatedArmies = await fetchAllArmies({
		onlyUndefeated: true, battle: battle.id,
	});

	if (undefeatedArmies.length === 1) {
		const victor = undefeatedArmies[0];
		announce(battle, `${format(victor)} IS VICTORIOUS!!!`);
		terminateWorkers(battle);
		await updateBattle(battle.id, { status: 'RESOLVED', victor });
	}
};
