const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
	Guild: String,
	Category: String,
});

module.exports = model('ticketSchema10010101', ticketSchema);