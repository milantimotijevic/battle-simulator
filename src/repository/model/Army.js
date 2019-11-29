const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: 'String',
	units: 'Number',
	startingUnits: 'Number',
});

mongoose.model('Army', schema, 'armies');
