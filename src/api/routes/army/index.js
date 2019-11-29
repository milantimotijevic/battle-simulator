const controller = require('./controller');
const validation = require('./validation');

const routes = [
	{
		method: 'GET',
		path: '/army',
		handler: controller.fetchAllArmiesHandler,
		options: {
			description: 'Search all armies',
			tags: ['api'],
		},
	},
	{
		method: 'GET',
		path: '/army/{id}',
		handler: controller.findOneArmyHandler,
		options: {
			description: 'Find a single army',
			tags: ['api'],
			validate: {
				params: validation.armyIdParam,
			},
		},
	},
	{
		method: 'POST',
		path: '/army',
		handler: controller.createArmyHandler,
		options: {
			description: 'Create an army',
			tags: ['api'],
			validate: {
				payload: validation.newArmySchema,
			},
		},
	},
	{
		method: 'PUT',
		path: '/add-army-to-battle/{battleId}/{armyId}',
		handler: controller.addArmyToBattleHandler,
		options: {
			description: 'Add an army into an existing battle',
			tags: ['api'],
			validate: {
				params: validation.addArmyToBattleParams,
			},
		},
	},
];

module.exports = routes;
