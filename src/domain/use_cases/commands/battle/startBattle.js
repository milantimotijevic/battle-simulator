const updateBattle = require('./updateBattle');
const findOneBattle = require('../../queries/battle/findOneBattle');

module.exports = async function startBattle(id) {
	const battle = await findOneBattle(id);
	// TODO validate battle
	// TODO start workers and update battle status if needed
	return updateBattle(battle.id, { status: 'ONGOING' });
};
