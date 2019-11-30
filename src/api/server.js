const Hapi = require('@hapi/hapi');

/**
 * Start Hapi server with port from .env file
 * routes.validate.failAction callback tells Joi to return descriptive validation error messages
 */
const server = new Hapi.Server({
	port: process.env.PORT,
	routes: {
		validate: {
			failAction: (request, h, err) => {
				throw err;
			},
		},

	},
});

module.exports = {
	/**
     * Dynamically loads all routes and applies them to the server object prior to starting the server
     */
	start: async () => {
		// eslint-disable-next-line global-require
		const routes = require('./routes');
		routes.forEach((route) => {
			server.route(route);
		});

		server.start();
	},
};
