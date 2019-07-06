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
 *   Rate: Command for Nova
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
	let rating = Math.floor(Math.random() * 101);
	let user = msg.mentions.users.first();
	let response;
	const member = msg.guild.member(user);

	if(!member) return msg.reply('Rate who? (Mention someone)');
	if(member.id == '189412734050238464') return msg.reply('Royce will always be a bad.');
	if(member.id == '472923135965003786' || member.id == '299314446428274689') return msg.reply('That is literally my creator.');
	if(rating < 25){
		response = 'seems like a bad person to me...';
	} else if (rating < 50){
		response = 'seems like a pretty decent guy person.';
	} else if (rating < 75){
		response = 'seems like a great person!';
	} else{
		response = 'is literally the best person ever.';
	}

	let embed = new Discord.RichEmbed();
	embed.setTitle('Rating');
	embed.setDescription(('Rating: ' + rating + ' -- ' + member.displayName + ' ' + response));
	embed.setColor(color);
	embed.setThumbnail(`${images.rate}`);
	msg.channel.send( {embed} );
};
  
exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'rate',
	description: 'Rate a user',
	usage: 'nva:rate (User)',
	category: '- Fun Commands',
};
  
