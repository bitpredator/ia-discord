client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'hello') {
		await interaction.reply({ content: 'Hello!', ephemeral: true });
	}
});