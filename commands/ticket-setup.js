const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Creates the ticket system'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('Create a ticket')
            .setDescription('Select the category of your ticket')
            .setColor('RANDOM')
            .setTimestamp();

        // create a dropdown menu with the options "General", "Moderation", "Support", "Bug Report", and "Other"
        const dropdown = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('ticket-category')
                    .setPlaceholder('Select a category')
                    .addOptions([
                        {
                            label: 'General',
                            description: 'General questions',
                            value: 'create-general',
                        },
                        {
                            label: 'Support',
                            description: 'Support questions',
                            value: 'support',
                        },
                        {
                            label: 'Bug Report',
                            description: 'Report a bug',
                            value: 'bug-report',
                        },
                        {
                            label: 'Other',
                            description: 'Other questions',
                            value: 'other',
                        },
                    ]),
            );
        
        // send the embed and the dropdown menu
        interaction.reply({ embeds: [embed], components: [dropdown] });
    }
};