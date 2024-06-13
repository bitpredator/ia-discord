const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with Hello!'),
	async execute(interaction) {
		await interaction.reply({ content: 'Hello!', ephemeral: false });
	},
};