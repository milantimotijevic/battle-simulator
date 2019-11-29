const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Battle.find({});
};

const findOne = function findOne(id) {
	// TODO make sure raw obj is returned (with .id prop)
	return mongoose.models.Battle.findById(id);
};

const createBattle = function createBattle(battleParam) {
	return mongoose.models.Battle.create(battleParam);
};

const addArmyToBattle = function addArmyToBattle(battle, army) {
	// TODO consider a way to work this one into updateBattle (low priority)
	return mongoose.models.Battle.updateOne({ _id: battle.id }, { $push: { armies: army.id } }, { new: true });
};

const updateBattle = function updateBattle(_id, props) {
	return mongoose.models.Battle.updateOne({ _id }, { $set: props }, { new: true });
};

const getBattleLog = function getBattleLog(id) {
	// TODO confirm projection syntax
	// TODO consider using existing method (findOne) with parametrized (query) projections
	return mongoose.models.Battle.findById(id, { log: 1 });
};

module.exports = {
	fetchAll,
	findOne,
	createBattle,
	addArmyToBattle,
	updateBattle,
	getBattleLog,
};
