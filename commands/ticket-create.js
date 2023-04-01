// create a new command called "ticket-create" with a description that creates a ticket
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Channel, GuildChannel } = require('discord.js');
const { Permissions } = require('discord.js');
const { User } = require('discord.js');


    module.exports = {
 	data: new SlashCommandBuilder()
 		.setName('ticket-create')
 		.setDescription('Creates a ticket'),
 	async execute(interaction) {
        // create a new text channel with the name of the user who created the ticket
        const channel = await interaction.guild.channels.create(
            `ticket-${interaction.user.username}`
        );
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        channel.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true});

        channel.setParent('1091440784697479219');
        // echo the user id of the user who created the ticket
        // set the permissions of the channel so that only the user who created the ticket and the staff can see it
        // add a button to the message with the label "close" and the style "DANGER" that closes the ticket
        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        channel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true});

        const close = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('Close')
                    .setStyle('DANGER'),
            );

        channel.send({ content: `Hello ${interaction.user}, thank you for creating a ticket. A staff member will be with you shortly.`, components: [close] });
        interaction.reply({ content: 'Ticket created!', ephemeral: true });
    }
};