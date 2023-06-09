const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Creates the ticket system'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'You do not have the required permissions to use this command!', ephemeral: true });
        const embed = new MessageEmbed()
            .setTitle('Create a ticket')
            .setDescription('Select the category of your ticket')
            .setColor('RANDOM')
            .setTimestamp();

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
        
        interaction.reply({ embeds: [embed], components: [dropdown] });
    }
};