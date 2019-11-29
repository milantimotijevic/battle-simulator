const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: 'String',
	units: 'Number',
	startingUnits: 'Number',
	defeated: { type: 'Boolean', defaultValue: false },
	reload: 'Number',
});

schema.set('toJSON', {
	virtuals: true,
});

mongoose.model('Army', schema, 'armies');
