const updateBattle = require('./updateBattle');
const findOneBattle = require('../../queries/battle/findOneBattle');
const startWorkers = require('../army/startWorkers');

module.exports = async function startBattle(id) {
	let battle = await findOneBattle(id);
	// TODO validate battle
	// TODO start workers and update battle status if needed
	// TODO update status if needed
	if (battle.status === 'PENDING') {
		battle = await updateBattle(battle.id, { status: 'ONGOING' });
	}
	await startWorkers(battle.armies);
	return battle;
};
