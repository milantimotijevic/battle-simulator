const Boom = require('@hapi/boom');
const ArmyRepository = require('../../../../repository/ArmyRepository');

module.exports = async function findOneArmy(id) {
	const army = await ArmyRepository.findOne(id);
	if (!army) {
		throw Boom.notFound(`Army with ID ${id} not found`);
	}
	return army;
};
