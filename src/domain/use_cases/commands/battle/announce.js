const BattleRepository = require('../../../../repository/BattleRepository');
const { format } = require('../../../use_cases/workers/helpers');

/**
 * Logs a battle-related action and persists it in battle's log
 * options = { skipDB: Boolean } - lets us know if we want to avoid storing the log
 */
module.exports = async function announce(battle, messageBody, options = {}) {
	const message = `BATTLE INFO - ${format(battle)}: ${messageBody}`;
	if (process.env.BATTLE_LOGGING === 'SHOW') {
		console.log(message);
	}

	if (options.skipDB) {
		// typically used when the log was created from the RESET BATTLE command
		return;
	}

	await BattleRepository.pushToArrayProperty(battle.id, 'log', message);
};
