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
	let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"));
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
	if (msg.author.id != "472923135965003786" && msg.author.id != "299314446428274689" && msg.author.id != "242775871059001344") return;
	let code = args.join(" ");
    
	try{
		let embed = new Discord.RichEmbed();
		embed.setTitle("JavaScript Evaluation");
		embed.addField("Input", code);
		embed.addField("Output", eval(code));
		embed.setColor(color);
		embed.setFooter("nvaUX" + settings.version);
		msg.channel.send(embed);
	} catch (e) {
		throwE(e);
	}
};

exports.conf = {
	aliases: ["dev"],
	guildOnly: false,
};
exports.help = {
	name: "eval",
	description: "Runs JS code",
	usage: "nva:eval (JavaScript)",
	category: "- Developer Commands",
};