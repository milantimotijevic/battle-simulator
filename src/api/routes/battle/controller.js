const fetchAllBattles = require('../../../domain/use_cases/queries/battle/fetchAllBattles');
const fetchOneBattle = require('../../../domain/use_cases/queries/battle/findOneBattle');
const createBattle = require('../../../domain/use_cases/commands/battle/createBattle');
const startBattle = require('../../../domain/use_cases/commands/battle/startBattle');
const resetBattle = require('../../../domain/use_cases/commands/battle/resetBattle');
const getBattleLog = require('../../../domain/use_cases/queries/battle/getBattleLog');
const createQuickstartBattle = require('../../../domain/use_cases/commands/battle/createQuickstartBattle');

const fetchAllBattlesHandler = async function fetchAllBattlesHandler() {
	return fetchAllBattles();
};

const findOneBattleHandler = async function findOneBattleHandler(request) {
	const { id } = request.params;
	return fetchOneBattle(id);
};

const createBattleHandler = async function createBattleHandler(request) {
	const battleParam = request.payload;
	return createBattle(battleParam);
};

const startBattleHandler = async function startBattleHandler(request) {
	const { id } = request.params;
	return startBattle(id);
};

const resetBattleHandler = async function resetBattleHandler(request) {
	const { id } = request.params;
	return resetBattle(id);
};

const getBattleLogHandler = async function getBattleLogHandler(request) {
	const { id } = request.params;
	return getBattleLog(id);
};

const createQuickstartBattleHandler = async function createQuickstartBattleHandler() {
	return createQuickstartBattle();
};

module.exports = {
	fetchAllBattlesHandler,
	findOneBattleHandler,
	createBattleHandler,
	startBattleHandler,
	resetBattleHandler,
	getBattleLogHandler,
	createQuickstartBattleHandler,
};
