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

module.exports = {
	fetchAll,
	findOne,
	createBattle,
	addArmyToBattle,
};
