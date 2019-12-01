const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function fetchAllArmies(filters) {
	return ArmyRepository.fetchAll(filters);
};
