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
module.exports.run = async (client, msg, args, throwE) => {
	const { version } = require("discord.js");
	const Discord = require("discord.js");
	const fs = require("fs");
	let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"));
	let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"));
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"));
	try{
		let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"));
		let colors = JSON.parse(fs.readFileSync("./colors.nvac", "utf8"));
		if(msg.guild){
			if(!prefixes[msg.guild.id]){
				prefixes[msg.guild.id] = {
					prefixes: settings.prefix
				};
			}
			if(!colors[msg.guild.id]){
				colors[msg.guild.id] = {
					colors: settings.color
				};
			}
			var prefix = prefixes[msg.guild.id].prefixes;
			var color = colors[msg.guild.id].colors;
		} else {
			var prefix = `${settings.prefix}`;
			var color = `${settings.color}`;
		}
		let used = process.memoryUsage().heapUsed / 1024 / 1024;
		let heartbeat = Math.round(client.ping);
		let pingtime = Date.now();

		let embed = new Discord.RichEmbed;
		embed.setTitle("System status");
		embed.setDescription(`Ping: calculating...\nHeartbeat: ${heartbeat}ms`);
		embed.setColor(color);
		embed.setThumbnail(`${images.cog}`);
		embed.addField("memory usage", `${Math.round(used * 100) / 100}Mb`);
		embed.addField("guilds", `${client.guilds.size}`);
		embed.addField("version", `This bot is running on nvaUX ${settings.version}`);
		embed.addField("Discord.js", `v${version}`, true );
		embed.addField("Node", `${process.version}`, true );
		embed.setFooter("Use "+prefix+"help to see all of my commands");
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
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: "sysmanager",
	description: "The sysmanager command",
	usage: "sysmanager",
	category: "- System Commands",
};