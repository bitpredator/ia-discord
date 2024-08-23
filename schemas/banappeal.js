const { Schema, model } = require('mongoose');

const banappeal = new Schema({
	AppealGuild: String,
	SendChannel: String,
	RegularGuild: String,
});

module.exports = model('banappealschema2983239487234', banappeal);