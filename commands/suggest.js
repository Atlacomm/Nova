/************************************************************************************************
 *...............................................................................
 *..........%%%%,....%%%%,...,%%%%%%%%/...%%%%#..../%%%%..../%%%%%%..............
 *.........,%%%%%/...%%%%,..%%%%%%%%%%%%,.(%%%%....%%%%#...,%%%%%%%%.............
 *.........,%%%%%%%..%%%%,.(%%%%*...%%%%%..%%%%*..,%%%%....%%%%.%%%%*............
 *.........,%%%%%%%%.%%%%,.%%%%%....%%%%%..*%%%%..%%%%(...*%%%%.,%%%%............
 *.........,%%%%.%%%%%%%%,.%%%%%....%%%%%...%%%%,.%%%%....%%%%...%%%%*...........
 *.........,%%%%..%%%%%%%,.(%%%%*...%%%%%...,%%%#(%%%*...#%%%%....%%%%...........
 *.........,%%%%...*%%%%%,..%%%%%%%%%%%%,....%%%%%%%%....%%%%,....%%%%(..........
 *.........,%%%%.....%%%%....,%%%%%%%%*......,%%%%%%,...#%%%%.....#%%%%..........
 *...............................................................................
 *
 *   Command here: Command for Nova
 *   Copyright (C) 2019 Designed and Programed by Swingin30 and Techlion
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * ***********************************************************************************************/
module.exports.run = async (client, msg, args, throwE, suggest, color, prefix, images) => {
	const Discord = require('discord.js');
	
	if(suggest == 'none') return msg.reply('The server admins have not configured a suggestions channel.');
	if(!args[0]) return msg.reply('Hey! Use \`' + prefix + 'suggest (suggestion)\` next time!');
	msg.delete();
	msg.channel.send('your suggestion has been sent!');
	let suggestion = args.join(' ');
	let embed = new Discord.RichEmbed();
	let channel = client.channels.find(ch => ch.id === suggest);
	embed.setDescription(suggestion);
	embed.setAuthor(msg.author.username, msg.author.avatarURL);
	embed.setColor(color);
	await channel.send(embed).then(function(msg) {
		msg.react(client.emojis.get('584093053510352917'))
			.then(() => msg.react(client.emojis.get('584093236398784512')))
			.then(() => msg.react(client.emojis.get('584093082035945482')))
			.catch(() => throwE('Reaction Error'));
	});
	

};
  
exports.conf = {
	aliases: [],
	guildOnly: true,
};
exports.help = {
	name: 'suggest',
	description: 'The suggestion command',
	usage: 'nva:suggest (suggestion)',
	category: '- Utility Commands',
};
  
