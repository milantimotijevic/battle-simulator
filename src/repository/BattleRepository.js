const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Battle.find({});
};

const findOne = function findOne(_id) {
	return mongoose.models.Battle.find({ _id });
};

const createBattle = function createBattle(battleParam) {
	return mongoose.models.Battle.insert(battleParam);
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

module.exports = {
	fetchAll,
	findOne,
	createBattle,
	addArmyToBattle,
	startBattle,
	resetBattle,
};
