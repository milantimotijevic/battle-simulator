const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = function fetchOneArmy(id) {
	return ArmyRepository.fetchAll(id);
};
