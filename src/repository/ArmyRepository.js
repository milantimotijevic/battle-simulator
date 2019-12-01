const mongoose = require('mongoose');

const fetchAll = function fetchAll(options = {}) {
	const { filters, excludeId } = options;

	if (excludeId) {
		filters.id = { $ne: excludeId };
	}
	return mongoose.models.Army.find(filters);
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
