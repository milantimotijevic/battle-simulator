const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function fetchAllArmies() {
	return ArmyRepository.fetchAll();
};
