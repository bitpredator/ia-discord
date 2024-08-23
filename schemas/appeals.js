const { Schema, model } = require('mongoose');

const banappeal = new Schema({
	AppealGuild: String,
	User: String,
	Message: String,
});

module.exports = model('banappealschema298323948723423222', banappeal);