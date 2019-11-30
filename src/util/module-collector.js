const fs = require('fs');
const path = require('path');

/**
 * Dynamically imports modules from the folder in which it was called
 * This action is considered a blocking one, however, it is only invoked once or twice upon deployment
 * The purpose of it is to lower the margin for error when importing from multiple files (e.g. routes and models)
 */
const collectToArray = (filename, dirname) => {
	const basename = path.basename(filename);

	return fs.readdirSync(dirname)
		.filter(file => (file.indexOf('.') !== 0) && (file !== basename))
	// eslint-disable-next-line global-require,import/no-dynamic-require
		.map(file => require(path.join(dirname, file)));
};

module.exports = {
	collectToArray,
};
