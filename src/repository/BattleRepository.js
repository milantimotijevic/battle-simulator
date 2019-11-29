const mongoose = require('mongoose');

const fetchAll = function fetchAll() {
    return mongoose.models.Battle.find({});
};

const findOne = function findOne(_id) {
    return mongoose.models.Battle.find({ _id });
};

const createArmy = function create(battleParam) {
    return mongoose.models.Battle.insert(battleParam);
};

module.exports = {
    fetchAll,
    findOne,
    createArmy,
};
