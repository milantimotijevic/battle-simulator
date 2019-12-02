const mongoose = require('mongoose');

const fetchAll = function fetchAll(options = {}) {
	const { filters, excludeId, sort } = options;

	if (excludeId) {
		filters.id = { $ne: excludeId };
	}
	return mongoose.models.Army.find(filters, {}, { sort });
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

/**
 * Increments an army's specified value by a specified amount
 */
const incrementValue = function incrementValue(_id, prop, value) {
	return mongoose.models.Army.updateOne({ _id }, { $inc: { [prop]: value } }, { new: true });
};

module.exports = {
	fetchAll,
	findOne,
	createArmy,
	updateArmy,
	updateMultipleArmies,
	incrementValue,
};
