const controller = require('./controller');
const validation = require('./validation');

const routes = [
	{
		method: 'GET',
		path: '/battle',
		handler: controller.fetchAllBattlesHandler,
		options: {
			description: 'Search all battles',
			tags: ['api'],
		},
	},
	{
		method: 'GET',
		path: '/battle/{id}',
		handler: controller.findOneBattleHandler,
		options: {
			description: 'Find a single battle',
			tags: ['api'],
			validate: {
				params: validation.battleIdParam,
			},
		},
	},
	{
		method: 'POST',
		path: '/battle',
		handler: controller.createBattleHandler,
		options: {
			description: 'Create a battle',
			tags: ['api'],
			validate: {
				payload: validation.newBattleSchema,
			},
		},
	},
	{
		method: 'PUT',
		path: '/battle/{id}/start',
		handler: controller.startBattleHandler,
		options: {
			description: 'Start a specific battle',
			tags: ['api'],
			validate: {
				params: validation.battleIdParam,
			},
		},
	},
	{
		method: 'PUT',
		path: '/battle/{id}/reset',
		handler: controller.resetBattleHandler,
		options: {
			description: 'Reset a battle in progress',
			tags: ['api'],
			validate: {
				params: validation.battleIdParam,
			},
		},
	},
	{
		method: 'GET',
		path: '/battle/{id}/log',
		handler: controller.getBattleLogHandler,
		options: {
			description: 'Get a specific battle\'s log',
			tags: ['api'],
			validate: {
				params: validation.battleIdParam,
			},
		},
	},
];

module.exports = routes;
