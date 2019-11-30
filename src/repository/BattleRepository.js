const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Battle.find({}).populate('armies');
};

const findOne = function findOne(id) {
	return mongoose.models.Battle.findById(id).populate('armies');
};

const findOneByArmyId = function findOneByArmyId(armyId) {
	return mongoose.models.Battle.findOne({ armies: mongoose.Types.ObjectId(armyId) });
};

const createBattle = function createBattle(battleParam) {
	return mongoose.models.Battle.create(battleParam);
};

const pushToArrayProperty = function pushToArrayProperty(_id, arrayName, item) {
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
	findOneByArmyId,
	createBattle,
	pushToArrayProperty,
	updateBattle,
	getBattleLog,
};
