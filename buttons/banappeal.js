const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	CustomID: 'banappeal',
	async execute(interaction, client) {
		const modal = new ModalBuilder()
			.setTitle('Ban Appeal Form')
			.setCustomId('banappealmodal');

		const input = new TextInputBuilder()
			.setCustomId('message')
			.setPlaceholder('Describe why it is you want to be unbanned.')
			.setLabel('Message to Staff')
			.setStyle(TextInputStyle.Paragraph);

		const question = new ActionRowBuilder()
			.addComponents(input);

		modal.addComponents(question);

		await interaction.showModal(modal);
	},
};