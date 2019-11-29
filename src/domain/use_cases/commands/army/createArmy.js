const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function createArmy(armyParam) {
	return ArmyRepository.createArmy(armyParam);
};
