// Require the necessary discord.js classes
const { Client, Intents, Message } = require('discord.js');
const { token } = require('./config.json');
const Canvas = require('canvas');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const { Embed } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;



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

		const user2 = interaction.options.getUser("player_2");
		var embedMsg = new MessageEmbed()
			.setThumbnail("https://images.assetsdelivery.com/compings_v2/kahovsky/kahovsky1712/kahovsky171200043.jpg")
			.setColor('0xFFFFFF')
			.setTitle('Morpion')
			.setAuthor({ name: "Joueurs : \n" + `${interaction.user.tag}` + " VS " + `${user2.tag}` })
			.setDescription('Utilisez les boutons pour jouer')
			.addFields(
				{ name: '\u200B', value: '\u200B' },
			)
			.setTimestamp();
		const canvas = Canvas.createCanvas(510, 510);
		const context = canvas.getContext('2d');
		const background = await Canvas.loadImage('./morpion.png');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		var mImg = new MessageAttachment(canvas.toBuffer(), 'morpion.png');
		embedMsg.setImage('attachment://morpion.png');


		const r1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('r11')
					.setLabel('↖')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r12')
					.setLabel('⬆')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r13')
					.setLabel('↗')
					.setStyle('PRIMARY'),

			);
		const r2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('r21')
					.setLabel('⬅')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r22')
					.setLabel('⚪')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r23')
					.setLabel('➡')
					.setStyle('PRIMARY'),
			);
		const r3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('r31')
					.setLabel('↙')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r32')
					.setLabel('⬇')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r33')
					.setLabel('↘')
					.setStyle('PRIMARY'),
			);

		var message = await interaction.reply({

			embeds: [embedMsg],
			fetchReply: true,
			files: [mImg],
			components: [r1, r2, r3]
		});

		var num = ['r11', 'r12', 'r13', 'r21', 'r22', 'r23', 'r31', 'r32', 'r33'];
		const filter = i => num.includes(i.customId) && (i.user.id === interaction.user.id || i.user.id === user2.id);

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

		var x;
		var y;
		var b = false;
		var btnTrace = "";
		var win = false;
		var mark;
		var board = [
			['0', '0', '0'],
			['0', '0', '0'],
			['0', '0', '0']
		];
		collector.on("collect", async btn => {

		var current_user = btn.user.id;
			switch (btn.customId) {
				case 'r11':
					x = 15;
					y = 15;
					break;
				case 'r12':
					x = 180;
					y = 15;
					break;
				case 'r13':
					x = 340;
					y = 15;
					break;

				case 'r21':
					x = 15;
					y = 180;
					break;
				case 'r22':
					x = 180;
					y = 180;
					break;
				case 'r23':
					x = 340;
					y = 180;
					break;

				case 'r31':
					x = 15;
					y = 345;
					break;
				case 'r32':
					x = 180;
					y = 345;
					break;
				case 'r33':
					x = 340;
					y = 345;
					break;

			}



			if (current_user == interaction.user.id) {
				symb = await Canvas.loadImage("croix.png");
				mark ='1';
			}
			else {
				symb = await Canvas.loadImage("cercle.png");
				mark='2';
			}

			if (btn.user.id != btnTrace) {
				num.splice(num.indexOf(btn.customId), 1);
				btnTrace = btn.user.id;
				context.drawImage(symb, x, y, 150, 150);
				mImg = new MessageAttachment(canvas.toBuffer(), 'morpion.png');
				embedMsg.setImage('attachment://morpion.png');

				await btn.deferUpdate();
				await interaction.editReply({

					embeds: [embedMsg],
					fetchReply: true,
					files: [mImg],
					components: [r1, r2, r3]
				}

				)
			}

			board[btn.customId.charAt(1)].splice(btn.customId.charAt(2),1,mark) ;

			if((board[0][0]==mark && board[0][1]== mark && board[0][2]==mark )|| //for row1 

            (board[1][0]==mark && board[1][1]==mark && board[1][2]==mark )||    //for row2

            (board[2][0]==mark && board[2][1]==mark && board[2][2]==mark )||    //for row3

            (board[0][0]==mark && board[1][0]==mark && board[2][0]== mark )||  //for Colm1 

            (board[0][1]==mark && board[1][1]==mark && board[2][1]==mark )||  //for Colm 2

            (board[0][2]==mark && board[1][2]==mark && board[2][2]==mark )||  //for colm 3

            (board[0][0]==mark && board[1][1]==mark && board[2][2]==mark )|| //diagnole 1

            (board[0][2]==mark && board[1][1]==mark && board[2][0]==mark )) //diagonal 2
			{ 
				mImg = new MessageAttachment(canvas.toBuffer(), 'winner.png');
				embedMsg.setImage('attachment://winnrt.png');
				await interaction.editReply({

					embeds: [embedMsg],
					fetchReply: true,
					files: [mImg],
					components: [r1, r2, r3]
				}

				)
			}


		});



		collector.on('end', collected => console.log(`Collected ${collected.size} items`));







	}

	/*const attachment = new MessageAttachment(
		"https://freepikpsd.com/file/2019/10/morpion-png-7-Transparent-Images-Free.png")
	await interaction.reply({ files: [attachment] });*/
}


);


client.login(token);