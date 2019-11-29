const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function resetArmies(armyIds) {
	return ArmyRepository.updateMultipleArmies(armyIds, { currentUnits: '$units', defeated: false, reload: 0 });
};
