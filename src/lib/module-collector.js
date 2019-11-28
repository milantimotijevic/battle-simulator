const fs = require('fs');
const path = require('path');

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
