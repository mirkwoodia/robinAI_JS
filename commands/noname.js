const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('noname')
		.setDescription('Renames users with a nonalphanumeric initial.')
		.addStringOption(option => option.setName('newname').setDescription('The new rename to set').setRequired(true)),
	async execute(interaction) {
		const value = interaction.options.getString('newname');
		// TODO: implement a counter starting from 0. Loop through entire user database of everyone in server, checking nickname if available, otherwise username. Check the first character, check if its alpha, and if not, rename. Incremement counter by 1. Return `Number of users renamed: \`${counter}\``"
		// Also, check for permission
		await interaction.reply(`The new name is: \`${value}\``);
	},
};