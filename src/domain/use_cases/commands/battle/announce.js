const BattleRepository = require('../../../../repository/BattleRepository');
const { format } = require('../../../use_cases/workers/helpers');

/**
 * Logs a battle-related action and persists it in battle's log
 */
module.exports = async function announce(battle, messageBody) {
	const message = `BATTLE INFO - ${format(battle)}: ${messageBody}`;
	console.log(message);
	await BattleRepository.pushToArrayProperty(battle.id, 'log', message);
};
