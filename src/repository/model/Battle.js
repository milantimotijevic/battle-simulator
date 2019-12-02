const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: { type: String, unique: true },
	status: { type: String, default: 'PENDING' },
	armies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Army' }],
	victor: { type: mongoose.Schema.Types.ObjectId, ref: 'Army' },
	log: [{ type: String }],
});

schema.set('toJSON', {
	virtuals: true,
});

mongoose.model('Battle', schema, 'battles');
