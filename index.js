// Require the necessary discord.js classes
const { Client, Intents, Message } = require('discord.js');
const { token } = require('./config.json');
const Canvas = require('canvas');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const { Embed } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

const morpion = require('./morpion.js');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {






	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	const { MessageAttachment } = require("discord.js")


	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'morpion') {
			morpion(interaction);
	
	}

	/*const attachment = new MessageAttachment(
		"https://freepikpsd.com/file/2019/10/morpion-png-7-Transparent-Images-Free.png")
	await interaction.reply({ files: [attachment] });*/
}


);


client.login(token);