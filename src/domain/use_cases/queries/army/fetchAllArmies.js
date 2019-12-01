const ArmyRepository = require('../../../../repository/ArmyRepository');

/**
 * Fetches all armies with possible filtering options:
 * options = { filter: {}, excludeId: 'String' }
 * Deliberately separating ID exclusion from the rest of the filters to avoid having business logic
 * meddle with mongoose syntax ('$ne', etc.)
 */
module.exports = function fetchAllArmies(options) {
	return ArmyRepository.fetchAll(options);
};
