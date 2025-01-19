const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rulesrole')
		.setDescription('This is the reaction role message command to approve the regulation')
		.addRoleOption(option => option.setName('role1').setDescription('This is the first role you want to set up').setRequired(true)),
	async execute(interaction) {

		const role1 = interaction.options.getRole('role1');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You must have admin perms to create a reaction role message', ephemeral: true });

		const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('button1')
					.setLabel(`${role1.name}`)
					.setStyle(ButtonStyle.Secondary),
			);

		const embed = new EmbedBuilder()
			.setColor('Blue')
			.setTitle('Reaction Roles')
			.setDescription(`React with the buttons below to get the role and approve the regulations! ! ${role1}`);

		await interaction.reply({ embeds: [embed], components: [button] });

		const collector = await interaction.channel.createMessageComponentCollector();

		collector.on('collect', async (i) => {

			const member = i.member;

			if (i.guild.members.me.roles.highest.position < role1.position) {
				i.update({ content: 'My role is below the roles that I\'m trying to give; I have shut this reaction role message down', embeds: [], components: [] });
				return;
			}

			if (i.customId === 'button1') {
				member.roles.add(role1);
				i.reply({ content: `You now have the role: ${role1.name}`, ephemeral: true });
			}
		});
	},
};