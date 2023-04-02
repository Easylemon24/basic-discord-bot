const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

    module.exports = {
 	data: new SlashCommandBuilder()
 		.setName('ticket-create')
 		.setDescription('Creates a ticket'),
 	async execute(interaction) {
        const channel = await interaction.guild.channels.create(
            `ticket-${interaction.user.username}`,
        );
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false });
        channel.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true});
        channel.setParent('1091440784697479219');
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
};