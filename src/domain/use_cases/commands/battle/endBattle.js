const announce = require('../../commands/battle/announce');
const { format } = require('../../../workers/helpers');
const updateBattle = require('../../commands/battle/updateBattle');

/**
 * Announces battle end and posts final messages
 */
module.exports = async function endBattle(battle, victor) {
	announce(battle, `${format(victor)} IS VICTORIOUS!!! THE BATTLE IS OVER!!!`);
	await updateBattle(battle.id, { status: 'RESOLVED', victor });
};
