const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: 'String',
	units: 'Number',
	currentUnits: 'Number',
	defeated: { type: 'Boolean', defaultValue: false },
	reload: 'Number',
	battle: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle' },
	strategy: 'String',
});

schema.set('toJSON', {
	virtuals: true,
});

mongoose.model('Army', schema, 'armies');
