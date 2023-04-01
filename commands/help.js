//create a new command called "help" with a description that shows all the commands and their descriptions in a nice embed with a title and a footer
// Path: commands\help.js
// Compare this snippet from commands\user.js:
 const { SlashCommandBuilder } = require('@discordjs/builders');
 const { MessageEmbed } = require('discord.js');

 module.exports = {
 	data: new SlashCommandBuilder()
 		.setName('help')
 		.setDescription('Returns a list of all commands'),
 	async execute(interaction) {
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(` Help`)
            .setDescription(`This is the help command. It shows all the commands and their descriptions.`)
            .addFields(
                // { name: 'Command: ', value: ``, inline: true },
                // { name: 'Description: ', value: ``, inline: true },
                { name: 'Command: ', value: `ping`, inline: true },
                { name: 'Description: ', value: `Replies with Pong!`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Command: ', value: `latency`, inline: true },
                { name: 'Description: ', value: `Replies with the latency of the bot`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Command: ', value: `user`, inline: true },
                { name: 'Description: ', value: `Returns user info`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Command: ', value: `server`, inline: true },
                { name: 'Description: ', value: `Returns server info`, inline: true },
            )
            .setTimestamp()

        await interaction.reply({ embeds: [exampleEmbed] });
    },
};
