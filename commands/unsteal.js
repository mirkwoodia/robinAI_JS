const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsteal')
		.setDescription('Removes an emoji from the server!')
		.addStringOption(option => option.setName('emojiname').setDescription('Enter the name of the emoji').setRequired(true)),
	async execute(interaction) {
		if (! interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) {
			return interaction.reply({content: "Something went wrong! Make sure to upload either an emoji file or a link to the emoji.",  ephemeral: true });
		}
		const name = interaction.options.getString('emojiname');
		let regex = /^<:[a-zA-Z]+:[0-9]+>.*$/i;
		if (regex.test(name)) {
			let regexNum = /[0-9]+/i;
			const id = name.match(regexNum);
			interaction.guild.emojis.fetch(id[0])
				.then(emoji => interaction.guild.emojis.delete(emoji))
				.catch(console.error);
		interaction.reply({content: `Successfully removed \`${name}\``,  ephemeral: true });
		} else {
			emote = interaction.guild.emojis.cache.find(emoji => emoji.name === name);
			interaction.guild.emojis.delete(emote)
				.catch(console.error);
			interaction.reply({content: `Successfully removed \`${name}\``,  ephemeral: true });
		}
	},
};																																														