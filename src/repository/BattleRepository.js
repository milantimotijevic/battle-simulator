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

/**
 * Pushes an item into a battle's Array-type property
 * This is useful for adding an army or updating the battle's log
 * It also returns the updated object
 */
const pushToArrayProperty = function pushToArrayProperty(_id, arrayName, item) {
	return mongoose.models.Battle.updateOne({ _id }, { $push: { [arrayName]: item } }, { new: true });
};

const updateBattle = function updateBattle(id, props) {
	return mongoose.models.Battle
		.findByIdAndUpdate(id, { $set: props }, { new: true }).populate('armies');
};

const getBattleLog = async function getBattleLog(id) {
	const battle = await mongoose.models.Battle.findById(id, { log: 1 });
	return battle.log;
};

const getBattleStatus = async function getBattleStatus(id) {
	const battle = await mongoose.models.Battle.findById(id, { status: 1 });
	return battle.status;
};

module.exports = {
	fetchAll,
	findOne,
	findOneByArmyId,
	createBattle,
	pushToArrayProperty,
	updateBattle,
	getBattleLog,
	getBattleStatus,
};
