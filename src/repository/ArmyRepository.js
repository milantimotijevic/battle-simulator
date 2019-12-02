const mongoose = require('mongoose');

/**
 * Fetch all and always sort (ASC) by currentUnits
 * No need to parametrize the latter, we always want them sorted like that
 * Allows filtering by 'defeated' and 'battle'
 */
const fetchAll = function fetchAll(options = {}) {
	const { onlyUndefeated, battle, excludeId } = options;
	const query = {};

	if (onlyUndefeated) {
		query.defeated = { $ne: true };
	}

	if (battle) {
		query.battle = battle;
	}

	if (excludeId) {
		query.id = { $ne: excludeId };
	}

	return mongoose.models.Army.find(query, {}, { sort: 'currentUnits' });
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
		.updateMany({ _id: { $in: ids } }, { $set: params });
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
