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
	const { version } = require('discord.js');
	const Discord = require('discord.js');
	const fs = require('fs');
    let settings = JSON.parse(fs.readFileSync('C:\\Users\\cjtho\\Documents\\Atlacomm\\Nova\\settings.nvac', 'utf8'));

	try{
		let used = process.memoryUsage().heapUsed / 1024 / 1024;
		let heartbeat = Math.round(client.ping);
		let pingtime = Date.now();
		uptime = client.uptime;
		var seconds = Math.round(uptime / 1000);
		var minutes = 0;
		var hours = 0;
		var days = 0;
 
		while(seconds >= 60){
			seconds -= 60;
			minutes += 1;
		}
		while(minutes >= 60){
			minutes -= 60;
			hours += 1;
		}
		while(hours >= 24){
			hours -= 24;
			days += 1;
		}
		let embed = new Discord.RichEmbed;
		embed.setTitle('System status');
		embed.setDescription(`Ping: calculating...\nHeartbeat: ${heartbeat}ms`);
		embed.setColor(color);
		embed.setThumbnail(`${images.cog}`);
		embed.addField('memory usage', `${Math.round(used * 100) / 100}Mb`, true);
		embed.addField('guilds', `${client.guilds.size}`, true);
		embed.addField('version', `This bot is running on nvaUX ${settings.version}`, true);
		embed.addField('Uptime', `Nova has been online for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`, true);
		embed.addField('Discord.js', `v${version}`, true );
		embed.addField('Node', `${process.version}`, true );
		embed.setFooter('Use '+prefix+'help to see all of my commands');
		msg.channel.send({embed}).then(function(msg) {
			let time = Date.now() - pingtime;
			embed.setDescription(`Ping: ${time.toString()}ms\nHeartbeat: ${heartbeat}ms`);
			msg.edit({embed});
  
		});
	}catch(e){
		throwE(e);
	}
    
};

exports.conf = {
	aliases: ['uptime', 'memory', 'sysmanager'],
	guildOnly: false,
};
exports.help = {
	name: 'system',
	description: 'shows current system statistics',
	usage: 'system',
	category: '- Utility Commands',
};