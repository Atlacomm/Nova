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
	const Discord = require("discord.js");
	const fs = require("fs");
	let settings = JSON.parse(fs.readFileSync("C:/Users/cjtho/Desktop/htdocs/private/js/nova/settings.nvac", "utf8"));
	let images = JSON.parse(fs.readFileSync(`${settings.directory}/images.nvac`, "utf8"));
	let prefixes = JSON.parse(fs.readFileSync(`${settings.directory}/prefixes.nvac`, "utf8"));
	let colors = JSON.parse(fs.readFileSync(`${settings.directory}/colors.nvac`, "utf8"));
  
	try{
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
		const categories = [];
		const commands = Array.from(client.commands.keys());
		commands.forEach(function(x) {
			if (!categories.includes(client.commands.get(x).help.category)) {
				categories.push(client.commands.get(x).help.category);
			}
		});
  

		if(msg.guild){
			if (!msg.guild.member(client.user).hasPermission("EMBED_LINKS")) return msg.reply("ERROR: Nova doesn't have the permission to send embed links please enable them to use the full help.");
		}
		const embed = new Discord.RichEmbed()
			.setAuthor(`Nova Help (Nova is on ${client.guilds.size} servers)`, client.user.avatarURL)
			.setThumbnail(`${images.unknown}`)
			.setDescription("Every command you input into Nova for this server is `" + prefix + "`")
			.setColor(color)
			.setFooter("Designed and Programed (with love) by Swingin30, Alee and TechLion Copyright 2019, Licensed with GPL-3.0");

		categories.forEach(function(x) {
			let cat = "";
			commands.forEach(function(command) {
				if (client.commands.get(command).help.category == x) {
					cat = cat + command + "\n";
				}
			});
			embed.addField(x, cat, true);
		});
		msg.channel.send({embed});
	} catch(e){
		throwE(e);
	}
};

exports.conf = {
	aliases: ["h"],
	guildOnly: false,
};
exports.help = {
	name: "help",
	description: "Displays all the commands or a page with information for 1 command.",
	usage: "help (command:command-name)",
	category: "- Utility Commands",
};
