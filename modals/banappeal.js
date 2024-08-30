const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const banappeal = require('../schemas/banappeal');
const appealuser = require('../schemas/appeals');

module.exports = {
	CustomID: 'banappealmodal',
	async execute(interaction, client) {

		const data = await banappeal.findOne({ AppealGuild: interaction.guild.id });
		if (!data) return await interaction.reply({ content: 'This appeal form is no longer active.', ephemeral: true });

		const sendGuild = await client.guilds.fetch(data.RegularGuild);
		const banned = await sendGuild.bans.fetch(interaction.user.id).catch(err => {});
		if (!banned) return await interaction.reply({ content: 'Sorry! You aren\'t banned, meaning you can\'t submit a ban appeal.', ephemeral: true });

		const check = await appealuser.findOne({ User: interaction.user.id });
		if (check) return await interaction.reply({ content: 'Sorry! You have already submitted a ban appeal request.', ephemeral: true });

		const SendChannel = await sendGuild.channels.fetch(data.SendChannel);

		const message = interaction.fields.getTextInputValue('message');

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setTitle('Ban Appeal Request')
			.setDescription('This user is requesting an unban and has sent a message below:')
			.addFields({ name: 'User', value: `${interaction.user.username} (\`${interaction.user.id}\`)` })
			.addFields({ name: 'Message', value: message })
			.setFooter({ text: 'Ban Appeal System' })
			.setTimestamp();

		const appealRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder
					.setCustomId('unbanbutton')
					.setStyle(ButtonStyle.Danger)
					.setLabel('🛠️ Complete Unban'),

				new ButtonBuilder()
					.setCustomId('denyappeal')
					.setStyle(ButtonStyle.Secondary)
					.setLabel('🗑️ Deny Request'),
			);

		const msg = await sendChannel.send({ embeds: [embed], components: [appealRow] });
		await interaction.reply({ content: '💪 Your appeal was submitted', ephemeral: true });

		await appealuser.create({
			AppealGuild: interaction.guild.id,
			User: interaction.user.id,
			Message: msg.id,
		});
	},
};