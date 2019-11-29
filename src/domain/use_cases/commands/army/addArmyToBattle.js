const ArmyRepository = require('../../../../repository/ArmyRepository');
const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function addArmyToBattle(battleId, armyId) {
	const battle = await BattleRepository.findOne(battleId);
	// TODO check battle status, etc.
	const army = await ArmyRepository.findOne(armyId);
	// TODO check army status, etc.

	return BattleRepository.pushToArrayProperty(battle, 'armies', army.id);
};
