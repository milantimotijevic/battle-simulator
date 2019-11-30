const mongoose = require('mongoose');

console.log('Initiating connection with MongoDB');
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
/**
 * This unhandled error will cause the application to crash in case connection with MongoDB cannot be established
 * We are currently OK with that
 */
db.on('error', () => {
	throw new Error('Error connecting to MongoDB');
});
db.once('open', () => {
	console.log('Connection with MongoDB established');
});
