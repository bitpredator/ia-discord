const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const banappeal = require('../schemas/banappeal');
const appealuser = require('../schemas/appeals');

module.exports = {
	CustomID: 'unbanbutton',
	async execute(interaction, client) {
		const data = await banappeal.findOne({ RegularGuild: interaction.guild.id });
		const appealData = await appealuser.findOne({ Message: interaction.message.id });

		if (!data) return await interaction.reply({ content: 'Looks like this system is no longer setup here', ephemeral: true });
		if (!appealData) return await interaction.reply({ content: 'There was a backend issue', ephemeral: true });

		const user = await client.users.fetch(appealData.User);

		let error = false;
		await interaction.guild.bans.remove(appealData.User).catch(err => {
			error = true;
		});

		if (error) {
			await interaction.reply({ content: 'There was an error unbanning this user.', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'I have unbanned this user and invited them back to the the server (if they have their DMs off, they did not receive a message).', ephemeral: true });
			await interaction.message.delete();

			await appealuser.deleteOne({ User: appealData.User });

			const invite = await interaction.channel.createInvite();
			await user.send(`👋 Your ban appeal has been accepted in ${interaction.guild.name}. You may now join back using this link: https://discord.gg/${invite.code}`).catch(err => {});
		}
	},
};