const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them (permanently).')
		.addUserOption(option => option.setName('target').setDescription('The member to be banned').setRequired(true)),
	category: 'moderation',
	async execute(interaction) {
		const user = interaction.options.getUser('target');
        guild.members.ban(user);
		return interaction.reply({ content: `You wanted to ban: ${member.user.username}`, ephemeral: true });
	},
};