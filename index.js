const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, MessageEmbed} = require('discord.js');
const { token } = require('./config.json');
const { logChannelId } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// update the status of the bot to the amount of servers it is in when a new server is added
client.on('guildCreate', () => {
    // get all servers the bot is in
    const guilds = client.guilds.cache.map(guild => guild.name);
    // set the status of the bot to "${guilds.length} servers"
    client.user.setActivity(`${guilds.length} servers`, { type: 'WATCHING' });
});

client.on('guildDelete', () => {
    // get all servers the bot is in
    const guilds = client.guilds.cache.map(guild => guild.name);
    // set the status of the bot to "${guilds.length} servers"
    client.user.setActivity(`${guilds.length} servers`, { type: 'WATCHING' });
});

client.once('ready', () => {
	console.log('Ready!');
    // get all servers the bot is in
    const guilds = client.guilds.cache.map(guild => guild.name);
    // set the status of the bot to "${guilds.length} servers"
    client.user.setActivity(`${guilds.length} servers`, { type: 'WATCHING' });
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
    if (interaction.customId === 'close-ticket') {
        interaction.channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

        const embedlogticketdelete = new MessageEmbed()
            .setTitle('Ticket closed')
            .setDescription(`Ticket closed by ${interaction.user}`)
            .setColor('RED')
            .setTimestamp()
            .setFooter('Ticket closed');

        interaction.channel.send({ content: `Ticket closed by ${interaction.user}` });

        // send a message to the channel with the id 1091441459066048663 that says "Ticket closed by ${user}"
        client.channels.cache.get(`${logChannelId}`).send({ embeds: [embedlogticketdelete] });

        return;
    }
});
// Just when a message contains nice, the bot will react with the letters n i c e and a thumbs up
client.on('messageCreate', message => {
    if (message.content.includes('nice')) {
        message.react('🇳');
        message.react('🇮');
        message.react('🇨');
        message.react('🇪');
        message.react('👍');
    }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
        if(command.data.name === 'ticket-create') {
            const embedlogticketcreate = new MessageEmbed()
                .setTitle('Ticket created')
                .setDescription(`Ticket created by ${interaction.user}`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter('Ticket created');
            client.channels.cache.get(`${logChannelId}`).send({ embeds: [embedlogticketcreate] });
        }
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);