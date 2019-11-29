const Joi = require('@hapi/joi');

const battleIdParam = {
	id: Joi.string().length(24).required(),
};

const newBattleSchema = {
	name: Joi.string().required(),
};

module.exports = {
	battleIdParam,
	newBattleSchema,
};
