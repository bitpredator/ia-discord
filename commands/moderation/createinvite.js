const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-invite')
		.setDescription('Create an invite for you guild')
		.addChannelOption(option => option.setName('channel').setDescription('The channel to create the invite in').setRequired(false))
		.addIntegerOption(option => option.setName('max-age').setDescription('The max age for your invite (in seconds)').setRequired(false))
		.addIntegerOption(option => option.setName('max-uses').setDescription('The max number of people who can use this invite').setMaxValue(100).setMinValue(100).setRequired(false))
		.addStringOption(option => option.setName('reason').setDescription('The reason for creating this invite').setRequired(false)),
	async execute(interaction) {

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.CreateInstantInvite)) return await interaction.reply({ content: 'This server does not allow members to create invites!', ephemeral: true });

		const { options } = interaction;
		const channel = options.getChannel('channel') || interaction.channel;
		const maxAge = options.getInteger('max-age') || 0;
		const maxUses = options.getInteger('max-uses') || 0;
		const reason = options.getString('reason') || 'No reason provided';

		const invite = await channel.createInvite({ maxAge: maxAge, maxUses: maxUses, reason: reason });

		if (maxAge === 0) maxAge === 'infinite';
		if (maxUses === 0) maxUses === 'infinite';

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setTitle('📩 I have created your inite link!')
			.addFields({ name: '🔗 Invite link', value: `https://discord.gg/${invite.code} OR \`${invite.code}\`` })
			.addFields({ name: '📋 Invite Channel', value: `*${channel}*` })
			.addFields({ name: '👨‍👨‍👦‍👦 Max Uses', value: `\`${maxUses}\`` })
			.addFields({ name: '👫 Max Age', value: `\`${maxAge}\`` })
			.setDescription(`You created thi invite for: *${reason}*!`)
			.setTimestamp()
			.setFooter({ text: 'Invite Generator' });

		await interaction.reply({ embeds: [embed], ephemeral: true });

	},

};