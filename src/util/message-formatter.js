/**
 * Produces an informative string out of an army/battle instance
 */
const format = function format(entity) {
	return `${entity.name} (${entity.id})`;
};

module.exports = {
	format,

};
