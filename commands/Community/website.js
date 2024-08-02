const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('website')
		.setDescription('This is the embed guide'),
	async execute(interaction) {

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setTitle('BPT DEVELOPMENT WEB SITE')
			.setURL('https://bitpredator.github.io/bptdevelopment/')
			.setAuthor({ name: 'Bitpredator', iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/6df2f308-14c0-4760-900c-5badb45d1a40-profile_image-300x300.png', url: 'https://bitpredator.github.io/bptdevelopment/' })
	        .setDescription('Official website for the BPT DEVELOPMENT community')
			.setThumbnail()
			.setImage('https://github.com/bitpredator/bptdevelopment/blob/main/static/img/docusaurus.png?raw=true')
			.setTimestamp()
			.setFooter({ text: '© Bitpredator', iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/6df2f308-14c0-4760-900c-5badb45d1a40-profile_image-300x300.png' });

		await interaction.reply({ embeds: [embed] });

	},
};
