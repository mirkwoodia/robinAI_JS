const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({ intents: myIntents });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// commandsPath is the path to the commands folder. Useful for cross-platform file systems
const commandsPath = path.join(__dirname, 'commands');
// commandFiles is a list of all the files under commandsPath, then filtered specifically for the javascript ones. Without the full path.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Events are interactions between bot and discord
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// A collection holds the commands
client.commands = new Collection();

for (const file of commandFiles) {
	// Simply joins the directory path with the filename, specifically for the OS in use.
	const filePath = path.join(commandsPath, file);
	// Looks into every command folder, pulling out the exported module into command
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	// Looks for the command that was executed under the collection client.commands
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);