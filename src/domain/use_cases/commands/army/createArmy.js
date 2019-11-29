const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function createArmy(armyParam) {
	// TODO look into ESlint settings to determine why spread operator is disallowed
	armyParam.current = armyParam.units;
	// return ArmyRepository.createArmy({...armyParam, currentUnits: armyParam.units});
	return ArmyRepository.createArmy(armyParam);
};
