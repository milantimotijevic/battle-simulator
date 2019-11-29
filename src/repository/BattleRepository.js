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

const pushToArrayProperty = function pushToArrayProperty(_id, arrayName, item) {
	// TODO consider a way to work this one into updateBattle (low priority)
	return mongoose.models.Battle.updateOne({ _id }, { $push: { [arrayName]: item } }, { new: true });
};

const updateBattle = function updateBattle(_id, props) {
	return mongoose.models.Battle.updateOne({ _id }, { $set: props }, { new: true });
};

const getBattleLog = function getBattleLog(id) {
	// TODO confirm projection syntax
	// TODO use exclusive property (projection)
	return mongoose.models.Battle.findById(id, { log: 1 });
};

module.exports = {
	fetchAll,
	findOne,
	createBattle,
	pushToArrayProperty,
	updateBattle,
	getBattleLog,
};
