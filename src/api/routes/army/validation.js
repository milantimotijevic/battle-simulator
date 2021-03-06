const Joi = require('@hapi/joi');

const armyIdParam = {
	id: Joi.string().length(24).required(),
};

const newArmySchema = {
	name: Joi.string().required(),
	units: Joi.number().integer().min(80).max(100)
		.required(),
	strategy: Joi.string().valid('RANDOM', 'WEAKEST', 'STRONGEST').required(),
};

const addArmyToBattleParams = {
	battleId: Joi.string().length(24).required(),
	armyId: Joi.string().length(24).required(),
};

module.exports = {
	armyIdParam,
	newArmySchema,
	addArmyToBattleParams,
};
