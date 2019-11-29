const updateBattle = require('./updateBattle');

module.exports = async function startBattle(battle) {
	// TODO check battle status
	// TODO start workers and update battle status if needed
	return updateBattle(battle.id, { status: 'ONGOING' });
};
