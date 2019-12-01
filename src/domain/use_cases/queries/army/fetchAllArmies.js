const ArmyRepository = require('../../../../repository/ArmyRepository');

/**
 * Fetch all armies with optional ID exclusion
 */
module.exports = function fetchAllArmies(excludeId) {
	return ArmyRepository.fetchAll(excludeId);
};
