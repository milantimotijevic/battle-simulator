const Boom = require('@hapi/boom');
const ArmyRepository = require('../../../../repository/ArmyRepository');
const BattleRepository = require('../../../../repository/BattleRepository');
const findOneBattle = require('../../queries/battle/findOneBattle');

/**
 * Adds an existing army to a PENDING battle
 * An army may only ever participate in a single battle
 */
module.exports = async function addArmyToBattle(battleId, armyId) {
	const battle = await findOneBattle(battleId);
	if (battle.status !== 'PENDING') {
		throw Boom.badRequest('Cannot add to an ongoing/resolved battle');
	}

	const army = await ArmyRepository.findOne(armyId);
	const existingBattle = await BattleRepository.findOneByArmyId(armyId);
	if (existingBattle) {
		throw Boom.badRequest(`Army is already in battle ${existingBattle.name} / ${existingBattle.id}`);
	}

	return BattleRepository.pushToArrayProperty(battle.id, 'armies', army.id);
};
