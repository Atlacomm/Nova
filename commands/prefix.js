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
	try{
		const discord = require("discord.js");
		const fs = require("fs");
		let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"));
		let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"));
		let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"));
		let colors = JSON.parse(fs.readFileSync("./colors.nvac", "utf8"));
		let requesterID = msg.author.id;
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
		let prefix = prefixes[msg.guild.id].prefixes;
		let color = colors[msg.guild.id].colors;
		if(!msg.member.hasPermission(0x00000008)){
			let fembed = new discord.RichEmbed;
			fembed.setTitle("error");
			fembed.setColor(0xff0000);
			fembed.setThumbnail(`${images.error}`);
			fembed.setDescription("You do not have sufficient permissions to run this command. Please talk to a server administrator. If you think this is a mistake, please contact a developer [here](https://discord.gg/RFXArBN)");
			fembed.setFooter("Use "+prefix+"help to see all of my commands");
			return msg.channel.send(fembed);
		}
		if(!args[0]) return msg.reply("usage: "+prefix+"prefix <new prefix>");
		if(args[0] == "help") return msg.reply("usage: "+prefix+"prefix <new prefix>");
		let embed = new discord.RichEmbed;
		embed.setAuthor(msg.author.username, msg.author.avatarURL);
		embed.setTitle("awaiting comfirmation");
		embed.setColor(color);
		embed.setThumbnail(`${images.timer5sec}`);
		embed.setDescription(`Are you sure you want to change the bot prefix to \`${args[0]}\` serverwide? React with 🚫 to cancel if you change your mind.`);
		embed.setFooter("Use "+prefix+"help to see all of my commands");
		await msg.channel.send(embed).then(function(msg) {
			msg.react("🚫");

			let timeout = setTimeout(function() {
				msg.clearReactions();
				//code goes below

				prefixes[msg.guild.id] = {
					prefixes: args[0]
				};
				fs.writeFile("./prefixes.nvac", JSON.stringify(prefixes), (err) => {
					if (err) console.log(err);
				});
				embed.setThumbnail(`${images.done}`);
				embed.setDescription(`Ok, the prefix is now \`${args[0]}\``);
				msg.edit(embed);



			}, 5000);
			msg.awaitReactions(function(reaction) {
				if (reaction.count > 1 && reaction.users.has(requesterID)) return true;
				return false;
			}, {

				max: 1
			}).then(function() {
				//Cancel the function
				clearTimeout(timeout);
				msg.clearReactions();
				embed.setThumbnail(`${images.cancel}`);
				embed.setDescription("The prefix change has been cancelled.");
				msg.edit(embed);
			});
		});
	}catch(e){
		throwE(e);
	}
};

exports.conf = {
	aliases: [],
	guildOnly: true,
};
exports.help = {
	name: "prefix",
	description: "The prefix command",
	usage: "prefix",
	category: "- Configuration Commands",
};