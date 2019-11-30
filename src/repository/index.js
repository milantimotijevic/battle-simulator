const mongoose = require('mongoose');

/**
 * Initiates connection with MongoDB and immediately loads models
 * Other modules will have easy access to the DB via requiring 'mongoose'
 */
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
