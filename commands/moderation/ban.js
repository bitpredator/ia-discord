const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them (permanently).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	category: 'moderation',
	async execute(interaction) {
		const member = interaction.options.getMember('target');
        member.ban();
		return interaction.reply({ content: `You Banned: ${member.user.username}`, ephemeral: true });
	},
};