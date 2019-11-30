const Boom = require('@hapi/boom');
const BattleRepository = require('../../../../repository/BattleRepository');
const findOneBattle = require('../../queries/battle/findOneBattle');
const findOneArmy = require('../../queries/army/findOneArmy');

/**
 * Adds an existing army to a PENDING battle
 * An army may only ever participate in a single battle
 */
module.exports = async function addArmyToBattle(battleId, armyId) {
	const battle = await findOneBattle(battleId);
	if (battle.status !== 'PENDING') {
		throw Boom.badRequest('Cannot add to an ongoing/resolved battle');
	}

	const army = await findOneArmy(armyId);
	const existingBattle = await BattleRepository.findOneByArmyId(armyId);
	if (existingBattle) {
		throw Boom.badRequest(`Army is already in battle ${existingBattle.name} / ${existingBattle.id}`);
	}

	await BattleRepository.pushToArrayProperty(battle.id, 'armies', army.id);
};
