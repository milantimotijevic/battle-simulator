const BattleRepository = require('../../../../repository/BattleRepository');
const format = require('../../../../util/message-formatter');

/**
 * Logs a battle-related action and persists it in battle's log
 * Don't want to wait for anything
 */
module.exports = function announce(battle, messageBody) {
	const message = `BATTLE INFO - ${format(battle)}): ${messageBody}`;
	console.log(message);
	BattleRepository.pushToArrayProperty(battle.id, 'log', message);
};
