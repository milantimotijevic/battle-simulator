const fetchAllBattles = require('../../../domain/use_cases/queries/battle/fetchAllBattles');
const fetchOneBattle = require('../../../domain/use_cases/queries/battle/findOneBattle');
const startBattle = require('../../../domain/use_cases/commands/battle/startBattle');
const resetBattle = require('../../../domain/use_cases/commands/battle/resetBattle');

const fetchAllBattlesHandler = async function fetchAllBattlesHandler() {
	return fetchAllBattles();
};

const findOneBattleHandler = async function findOneBattleHandler(id) {
	return fetchOneBattle(id);
};

const startBattleHandler = async function startBattleHandler(id) {
	return startBattle(id);
};

const resetBattleHandler = async function resetBattleHandler(id) {
	return resetBattle(id);
};

module.exports = {
	fetchAllBattlesHandler,
	findOneBattleHandler,
	startBattleHandler,
	resetBattleHandler,

};
