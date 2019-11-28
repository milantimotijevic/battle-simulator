const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	// eslint-disable-next-line global-require
	require('./model');
});

const db = mongoose.connection;
// TODO handle connection error better
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connection with DB established');
});
