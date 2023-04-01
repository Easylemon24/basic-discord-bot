const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 	data: new SlashCommandBuilder()
 		.setName('latency')
 		.setDescription('Replies with the latency of the bot'),
 	async execute(interaction) {
 		// insert the code into an embed
         const Embed = new MessageEmbed()
         .setColor('#0099ff')
         .setTitle(` Latency `)
         .setDescription(`This is the latency of the bot. The latency is the time it takes for the bot to send a message.`)
         .addFields(
            { name: 'Latency: ', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
            { name: 'API Latency: ', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true },
         )
         .setTimestamp()

     await interaction.reply({ embeds: [Embed] });
 	},
};

