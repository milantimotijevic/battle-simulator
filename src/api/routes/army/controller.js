const fetchAllArmies = require('../../../domain/use_cases/queries/army/fetchAllArmies');
const findOneArmy = require('../../../domain/use_cases/queries/army/findOneArmy');
const createArmy = require('../../../domain/use_cases/commands/army/createArmy');
const addArmyToBattle = require('../../../domain/use_cases/commands/battle/addArmyToBattle');


const fetchAllArmiesHandler = async function fetchAllArmiesHandler() {
	return fetchAllArmies();
};

const findOneArmyHandler = async function findOneArmyHandler(request) {
	const { id } = request.params;
	return findOneArmy(id);
};

const createArmyHandler = async function createArmyHandler(request) {
	const armyParam = request.payload;
	return createArmy(armyParam);
};

const addArmyToBattleHandler = async function addArmyToBattleHandler(request, h) {
	const { battleId, armyId } = request.params;
	await addArmyToBattle(battleId, armyId);

	return h.response().code(204);
};

module.exports = {
	fetchAllArmiesHandler,
	findOneArmyHandler,
	createArmyHandler,
	addArmyToBattleHandler,
};
