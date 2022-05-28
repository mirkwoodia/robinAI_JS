const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const {clientId, token} = require('../config.json');

const commands = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

module.exports = {
    name: 'guildCreate',
    execute(guild) {
			// deploy-commands here for the guild id
			(async () => {
				try {
					console.log('Started refreshing application (/) commands.');

					await rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: commands });

					console.log('Successfully reloaded application (/) commands.');
				} catch (error) {
					console.error(error);
				}
			})();
			console.log(`Server ${guild.name} just joined`);
    },
};