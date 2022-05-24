const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('steal')
		.setDescription('Uploads an emoji via emoji url to the server!')
		.addStringOption(option => option.setName('emojiname').setDescription('Enter a name for the emoji').setRequired(true))
		.addAttachmentOption(option => option.setName('attachment').setDescription('Attach the emoji file'))
		.addStringOption(option => option.setName('url').setDescription('Link to the emoji')),
	async execute(interaction) {
		if (! interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) {
			return interaction.reply({content: "Something went wrong! Make sure to upload either an emoji file or a link to the emoji.",  ephemeral: true });
		}
		const name = interaction.options.getString('emojiname');
		const url = interaction.options.getString('url');
		const attachment = interaction.options.getAttachment('attachment');
		// TODO: check for permission. Check for errors, and just output them as the DiscordAPIError says it
		if (url) {
			// Create a new emoji from a URL
			interaction.guild.emojis.create(url, name)
				.then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
				.catch(console.error);
			interaction.reply({content: `Created new emoji with name \`${name}\`!`,  ephemeral: true });
		}
		else if (attachment) {
			// Create a new emoji from a file on your computer
			interaction.guild.emojis.create(attachment.attachment, name)
				.then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
				.catch(console.error);
			interaction.reply({content: `Created new emoji with name \`${name}\`!`,  ephemeral: true });
		} else return interaction.reply({content: "Something went wrong! Make sure to upload either an emoji file or a link to the emoji.",  ephemeral: true });
	},
};																																														