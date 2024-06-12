const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Select a member to unban.')
		.addUserOption(option => option.setName('target').setDescription('The member to unban').setRequired(true)),
	category: 'moderation',
	async execute(interaction) {
        const user = interaction.options.getUser('target');
        guild.members.unban(user);
		return interaction.reply({ content: `You wanted to lift the ban: ${member.user.username}`, ephemeral: true });
	},
};