const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Army.find({});
};

const findOne = function findOne(id) {
	return mongoose.models.Army.findById(id);
};

const createArmy = function createArmy(armyParam) {
	return mongoose.models.Army.create(armyParam);
};

const updateArmy = function updateArmy(_id, params) {
	return mongoose.models.Army.updateOne({ _id }, { $set: params });
};

const updateMultipleArmies = function updateMultipleArmies(ids, params) {
	return mongoose.models.Army
		.updateMany({ _id: { $in: ids } }, { $set: params }, { useFindAndModify: false });
};

module.exports = {
	fetchAll,
	findOne,
	createArmy,
	updateArmy,
	updateMultipleArmies,
};
