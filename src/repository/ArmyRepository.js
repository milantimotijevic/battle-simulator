const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
	return mongoose.models.Army.find({});
};

const findOne = function findOne(_id) {
	return mongoose.models.Army.find({ _id });
};

module.exports = {
	fetchAll,
	findOne,
};
