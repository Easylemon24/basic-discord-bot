const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, MessageEmbed, 
MessageActionRow, MessageButton} = require('discord.js');
const { token, logChannelId, ticketCategoryId } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('guildCreate', () => {
    const guilds = client.guilds.cache.map(guild => guild.name);
    client.user.setActivity(`${guilds.length-1} servers`, { type: 'WATCHING' });
});

client.on('guildDelete', () => {
    const guilds = client.guilds.cache.map(guild => guild.name);
    client.user.setActivity(`${guilds.length-1} servers`, { type: 'WATCHING' });
});

client.once('ready', () => {
	console.log('Ready!');
    const guilds = client.guilds.cache.map(guild => guild.name);
    client.user.setActivity(`${guilds.length-1} servers`, { type: 'WATCHING' });
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
    
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

    if (interaction.customId === 'close-ticket') {
        interaction.channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

        const embedlogticketdelete = new MessageEmbed()
            .setTitle('Ticket closed')
            .setDescription(`Ticket closed by ${interaction.user}`)
            .setColor('RED')
            .setTimestamp();

        interaction.channel.send({ embeds: [embedlogticketdelete] });
        client.channels.cache.get(`${logChannelId}`).send({ embeds: [embedlogticketdelete] });

        return;
    }

	try {
		await command.execute(interaction);
        if(command.data.name === 'ticket-create') {
            const embedlogticketcreate = new MessageEmbed()
                .setTitle('Ticket created')
                .setDescription(`Ticket created by ${interaction.user}`)
                .setColor('GREEN')
                .setTimestamp();
            client.channels.cache.get(`${logChannelId}`).send({ embeds: [embedlogticketcreate] });
        }
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

    const command = client.commands.get(interaction.commandName);

    if (interaction.customId === 'ticket-category') {
        const channel = await interaction.guild.channels.create(
            `ticket-${interaction.values}-${interaction.user.username}`
        );
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        channel.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true});
        channel.setParent(`${ticketCategoryId}`);
        const close = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('Close')
                    .setStyle('DANGER'),
        );

        const embed = new MessageEmbed()
            .setTitle('Ticket')
            .setDescription(`Hello ${interaction.user}, thank you for creating a ticket. A staff member will be with you shortly.`)
            .setColor('RANDOM')
            .setTimestamp();

        channel.send({ embeds: [embed], components: [close] });

        interaction.reply({ content: 'Ticket created!', ephemeral: true });
    }

    try {
        if(interaction.customId === 'ticket-category') {
            const embedlogticketcreate = new MessageEmbed()
                .setTitle('Ticket created')
                .setDescription(`Ticket created by ${interaction.user} in ${interaction.values} category`)
                .setColor('GREEN')
                .setTimestamp();
            client.channels.cache.get(`${logChannelId}`).send({ embeds: [embedlogticketcreate] });
        }
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(token);