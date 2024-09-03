const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const banappeal = require('../../schemas/banappeal');

module.exports = {
	admin: true,
	data: new SlashCommandBuilder()
		.setName('ban-appeal')
		.setDescription('ban appeal')
		.addSubcommand(command => command.setName('setup').setDescription('Setup the ban appeal system')
			.addStringOption(option => option.setName('guild-id').setDescription('The ID of the ban appeal guild').setRequired(true))
			.addChannelOption(option => option.setName('appeal-channel').setDescription('The channel to send your ban appeal requests to').setRequired(true)),
		)
		.addSubcommand(command => command.setName('disable').setDescription('Disable the ban appeal system'))
		.addSubcommand(command => command.setName('send-message').setDescription('Send the ban appeal embed in your ban appeal server')),
	async execute(interaction, client) {

		const { options } = interaction;
		const sub = options.getSubcommand();
		const regularData = await banappeal.findOne({ RegularGuild: interaction.guild.id });
		const appealServerData = await banappeal.findOne({ AppealGuild: interaction.guild.id });

		async function sendMessage(message) {
			const embed = new EmbedBuilder()
				.setColor('Blurple')
				.setDescription(message);

			await interaction.reply({ embeds: [embed], ephemeral: true });
		}

		switch (sub) {
		case 'setup':
			if (regularData || appealServerData) {
				await sendMessage('⚠️ Looks like this server is already appart of the ban appeal system either as a regular or an appeal guild');
			}
			else {
				const guildId = options.getString('guild-id');
				const appChannel = options.getChannel('appeal-channel');

				await banappeal.create({
					AppealGuild: guildId,
					SendChannel: appChannel.id,
					RegularGuild: interaction.guild.id,
				});

				await sendMessage(`🌍 I have linked \`${guildId}\` with this server for ban appeals. Go to a channel in your ban appeal and run \`/ban-appeal send-message\` to finish setting this up`);
			}
			break;
		case 'disable':
			if (!regularData) {
				await sendMessage('⚠️ Sorry! I can\'t disable a system that isn\'t already setup');
			}
			else {
				await banappeal.deleteOne({ RegularGuild: interaction.guild.id });

				await sendMessage('🌍 I have disabled the ban appeal system associated with this server.');
			}
			break;
		case 'send-message':
			if (!appealServerData) {
				await sendMessage('⚠️ This a not a setup ban appeal server yet');
			}
			else {
				const guild = await client.guilds.fetch(appealServerData.RegularGuild);

				const embed = new EmbedBuilder()
					.setColor('Blurple')
					.setTitle(`Ban Appeal for ${guild.name}`)
					.setDescription('👉 Complete the ban appeal from below to submit your request to be unbanned. If your request is accepted, you will receive a DM notifyng you of your unban.')
					.setFooter({ text: ' Ban Appeal System' })
					.setTimestamp();

				const appealRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('banappeal')
							.setStyle(ButtonStyle.Primary)
							.setLabel('📫 Submit Appeal'),
					);

				await interaction.reply({ content: 'I have sent your ban appeal message', ephemeral: true });
				await interaction.channel.send({ embeds: [embed], components: [appealRow] });
			}
		}
	},
};