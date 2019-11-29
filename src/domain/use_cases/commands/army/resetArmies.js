const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function resetArmies(armyIds) {
	return ArmyRepository.resetArmies(armyIds);
};
