const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function resetArmies(armyIds) {
	// TODO kill workers here
	return ArmyRepository.resetArmies(armyIds);
};
