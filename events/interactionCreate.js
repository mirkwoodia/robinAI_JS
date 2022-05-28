module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in server ${interaction.guild.name} in channel #${interaction.channel.name} triggered an interaction.`);
	},
};