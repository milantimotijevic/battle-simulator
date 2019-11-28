const Hapi = require('@hapi/hapi');

const server = new Hapi.Server({
	port: process.env.PORT,
});

module.exports = {
	start: async () => {
		// eslint-disable-next-line global-require
		const routes = require('./routes');
		routes.forEach((route) => {
			server.route(route);
		});

		server.start();
	},
};
