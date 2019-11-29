const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: 'String',
	armies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Army' }],
});

mongoose.model('Battle', schema, 'battles');
