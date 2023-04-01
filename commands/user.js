const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Returns user info'),
	async execute(interaction) {
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(` ${interaction.user.username}#${interaction.user.discriminator} `)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}`, url: `${interaction.user.avatarURL()}`})
            .setThumbnail(` ${ interaction.user.avatarURL() } `)
            .addFields(
                { name: 'Joining Date: ', value: `${interaction.member.joinedAt}`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Created at: ', value: `${interaction.user.createdAt}`, inline: true },
                { name: 'User ID: ', value: `${interaction.user.id}`, inline: true },
                { name: 'User roles: ', value: `${interaction.member.roles.cache.map(role => role.toString()).join(' ')}`, inline: true },
            )
            .setTimestamp()

        await interaction.reply({ embeds: [exampleEmbed] });
	},
};