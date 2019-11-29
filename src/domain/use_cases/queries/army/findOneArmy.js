const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function findOneArmy(id) {
	return ArmyRepository.findOne(id);
};
