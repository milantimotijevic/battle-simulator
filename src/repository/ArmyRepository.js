const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Army.find({});
};

const findOne = function findOne(id) {
	return mongoose.models.Army.findById(id);
};

const createArmy = function createArmy(armyParam) {
	return mongoose.models.Army.insert(armyParam);
};

const resetArmies = function resetArmies(armyIds) {
	// TODO confirm whether $-referencing works
	return mongoose.models.Army.updateMany({ _id: { $in: [armyIds] } }, { $set: { units: '$startingUnits' } });
};

module.exports = {
	fetchAll,
	findOne,
	createArmy,
	resetArmies,
};
