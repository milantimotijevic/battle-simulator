const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Battle.find({});
};

const findOne = function findOne(id) {
	return mongoose.models.Battle.findById(id);
};

const createBattle = function createBattle(battleParam) {
	return mongoose.models.Battle.create(battleParam);
};

const addArmyToBattle = function addArmyToBattle(battle, army) {
	return mongoose.models.Battle.update({ _id: battle.id }, { $push: { armies: army.id } });
};

const startBattle = function startBattle(battle) {
	return mongoose.models.Battle.update({ _id: battle.id }, { $set: { status: 'ONGOING' } });
};

const resetBattle = function resetBattle(battle) {
	// TODO consider having a collection with all the actions, so they can be easily reverted
	return mongoose.models.Battle.update({ _id: battle.id }, { $set: { log: [] } });
};

const getBattleLog = function getBattleLog(id) {
	// TODO confirm projection syntax
	return mongoose.models.Battle.findById(id, { log: 1 });
};

module.exports = {
	fetchAll,
	findOne,
	createBattle,
	addArmyToBattle,
	startBattle,
	resetBattle,
	getBattleLog,
};
