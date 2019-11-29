const Boom = require('@hapi/boom');
const ArmyRepository = require('../../../../repository/ArmyRepository');
const BattleRepository = require('../../../../repository/BattleRepository');

module.exports = async function addArmyToBattle(battleId, armyId) {
	const battle = await BattleRepository.findOne(battleId);
	if (battle.status !== 'PENDING') {
		throw Boom.badRequest('Cannot add to an ongoing/resolved battle');
	}

	const army = await ArmyRepository.findOne({ id: armyId });
	// TODO check army status, etc.

	return BattleRepository.pushToArrayProperty(battle.id, 'armies', army.id);
};
