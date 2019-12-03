const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function createArmy(armyParam) {
	// TODO look into ESlint settings to determine why spread operator is disallowed
	armyParam.currentUnits = armyParam.units;
	armyParam.defeated = false;
	// return ArmyRepository.createArmy({...armyParam, currentUnits: armyParam.units});
	return ArmyRepository.createArmy(armyParam);
};
