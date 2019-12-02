/* eslint no-await-in-loop: 0 */
/* eslint no-plusplus: 0 */
/* eslint no-underscore-dangle: 0 */

const createBattle = require('./createBattle');
const createArmy = require('../army/createArmy');
const addArmyToBattle = require('./addArmyToBattle');
const findOneBattle = require('../../queries/battle/findOneBattle');

const battleData = require('../../../../../bootstrap-data/battle');
const armiesData = require('../../../../../bootstrap-data/armies');
/**
 * Creates a sample battle out of bootstrap data
 */
module.exports = async function createQuickstartBattle() {
	const battle = await createBattle(battleData);
	const battleId = battle._id;

	for (let i = 0; i < armiesData.length; i++) {
		armiesData[i].battle = battleId;
		const army = await createArmy(armiesData[i]);
		await addArmyToBattle(battleId, army._id);
	}

	return findOneBattle(battleId);
};
