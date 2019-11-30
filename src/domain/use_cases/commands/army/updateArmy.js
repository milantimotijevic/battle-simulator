const ArmyRepository = require('../../../../repository/ArmyRepository');

/**
 * Updates a single army. It queries by army ID and allows a custom number of properties
 * Only the properties passed with be affected
 */
module.exports = function updateArmy(id, params) {
	return ArmyRepository.updateArmy(id, params);
};
