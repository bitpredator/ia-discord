const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const appealuser = require('../schemas/appeals');

module.exports = {
	customID: 'denyappeal',
	async execute(interaction, client) {

		const data = await appealuser.findOne({ Message: interaction.message.id });
		if (!data) return ;

		await appealuser.deleteOne({ User: data.User });

		await interaction.message.delete();
	},
};