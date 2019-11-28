// TODO create lib for module loader

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== basename))
// eslint-disable-next-line global-require,import/no-dynamic-require
	.map(file => (require(path.join(__dirname, file))));
