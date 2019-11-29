const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function createArmy(armyParam) {
	// TODO look into ESlint settings to determine why spread operator is disallowed
	armyParam.startingUnits = armyParam.units;
	// return ArmyRepository.createArmy({...armyParam, startingUnits: armyParam.units});
	return ArmyRepository.createArmy(armyParam);
};
