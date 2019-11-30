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

const updateBattle = function updateBattle(id, props) {
	return mongoose.models.Battle
		.findByIdAndUpdate(id, { $set: props }, { new: true }).populate('armies');
};

/**
 * Fetches a single battle's log
 * The reason why this wasn't rolled in the above findOne method was because said method uses population (for armies),
 * which nullifies projection
 * If the application ends up needing projections for properties other than the log, this method should be changed to
 * 'getOneWithProjection' with parametrized projection param and no population
 */
const getBattleLog = function getBattleLog(id) {
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
