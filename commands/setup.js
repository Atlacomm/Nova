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
 *   Setup: Command for Nova
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
	const fs = require('fs');
	let settings = JSON.parse(fs.readFileSync('/home/se/htdocs/private/js/nova/settings.nvac', 'utf8'));
	let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));
	let prefixes = JSON.parse(fs.readFileSync(`${settings.directory}/prefixes.nvac`, 'utf8'));  
	let colors = JSON.parse(fs.readFileSync(`${settings.directory}/colors.nvac`, 'utf8'));
	
	try{
		if (!msg.member.hasPermission('KICK_MEMBERS') && msg.author.id != '472923135965003786' && msg.author.id != '299314446428274689' && msg.author.id != '242775871059001344') return msg.reply('Only people with \`Kick_Members\` can do that!');
    
		msg.delete();
		let embed = new Discord.RichEmbed();
		embed.addField('Nova Configuration', `1 - Suggestion Channel (<#${serverConf.suggest[msg.guild.id].suggest}>) \n 2 - Chat Log Channel (<#${serverConf.messages[msg.guild.id].messages}>) \n 3 - Member Alerts Channel (<#${serverConf.member[msg.guild.id].member}>) \n 4 - Prefix (\`${prefix}\`)\n 5 - Embed Colors (\`${color}\`) \n Exit - Exit Menu`);
		embed.setColor(`${color}`);
		embed.setThumbnail(`${images.settings}`);
		embed.setAuthor(msg.guild.name, msg.guild.iconURL);
		msg.channel.send({embed});
		const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
		console.log(collector);
		collector.on('collect', msg => {
			if (msg.content == '1') {
				msg.delete();
				collector.stop();
				msg.channel.send(':gear: What channel would you like to set for suggestions? (#<channel>) (None) | (Cancel)');
				const scollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
				scollector.on('collect', msg => {
					if (msg.content == 'cancel' || msg.content == 'Cancel') {
						msg.delete();
						msg.channel.send('Ok. Exited Menu.');
						scollector.stop();
						return;
					}  else {
						if(msg.content == 'none' || msg.content == 'None') {
							serverConf.suggest[msg.guild.id] = {
								suggest: 'none'
							};
							msg.channel.send(':gear: Cleared the suggestions channel.');
						}else{
							let channelID = msg.content.substring(2, 20);
							serverConf.suggest[msg.guild.id] = {
								suggest: channelID
							};
							msg.channel.send(':gear: Set <#' + serverConf.suggest[msg.guild.id].suggest + '> as the suggestions channel.');
						}
						scollector.stop();
						fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
							if (err) console.log(err);
						});
					}
				});
			}else if (msg.content == '2'){
				msg.delete();
				collector.stop();
				msg.channel.send(':gear: What channel would you like to set for chat logging? (#<channel>) (None) | (Cancel)');
				const scollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
				scollector.on('collect', msg => {
					if (msg.content == 'cancel' || msg.content == 'Cancel') {
						msg.delete();
						msg.channel.send(':gear: Ok. Exited Menu.');
						scollector.stop();
						return;
					}  else {
						if(msg.content == 'none' || msg.content == 'None') {
							serverConf.messages[msg.guild.id] = {
								messages: 'none'
							};
							msg.channel.send(':gear: Cleared the chat log channel.');
						}else{
							let channelID = msg.content.substring(2, 20);
							serverConf.messages[msg.guild.id] = {
								messages: channelID
							};
							msg.channel.send(':gear: Set <#' + serverConf.messages[msg.guild.id].messages + '> as the chat log channel.');
						}
						scollector.stop();
						fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
							if (err) console.log(err);
						});
					}        
				});
			}else if (msg.content == '3'){
				msg.delete();
				collector.stop();
				msg.channel.send(':gear: What channel would you like to set for member alerts? (#<channel>) (None) | (Cancel)');
				const scollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
				scollector.on('collect', msg => {
					if (msg.content == 'cancel' || msg.content == 'Cancel') {
						msg.delete();
						msg.channel.send(':gear: Ok. Exited Menu.');
						scollector.stop();
						return;
					}  else {
						if(msg.content == 'none' || msg.content == 'None') {
							serverConf.member[msg.guild.id] = {
								member: 'none'
							};
							msg.channel.send(':gear: Cleared the member log channel.');
						}else{
							let channelID = msg.content.substring(2, 20);
							serverConf.member[msg.guild.id] = {
								member: channelID
							};
							msg.channel.send(':gear: Set <#' + serverConf.member[msg.guild.id].member + '> as the member log channel.');
						}
						scollector.stop();
						fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
							if (err) console.log(err);
						});
					}
				});
			}else if (msg.content == '4'){
				msg.delete();
				collector.stop();
				msg.channel.send(':gear: What would you like to set the prefix to?');
				const scollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
				scollector.on('collect', msg => {
					if (msg.content == 'cancel' || msg.content == 'Cancel') {
						msg.delete();
						msg.channel.send(':gear: Ok. Exited Menu.');
						scollector.stop();
						return;
					} else{

						prefixes[msg.guild.id] = {
							prefixes: msg.content
						};
						fs.writeFile(`${settings.directory}/prefixes.nvac`, JSON.stringify(prefixes), (err) => {
							if (err) console.log(err);
						});
						msg.channel.send(':gear: Set the prefix to ' + prefixes[msg.guild.id].prefixes);
						scollector.stop();
					}
				});
			}else if (msg.content == '5'){
				msg.delete();
				collector.stop();
				msg.channel.send(':gear: Enter a hex code (ex: 0xE70056 [Default Color])');
				const scollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 20000 });
				scollector.on('collect', msg => {
					if (msg.content == 'cancel' || msg.content == 'Cancel') {
						msg.delete();
						msg.channel.send(':gear: Ok. Exited Menu.');
						scollector.stop();
						return;
					}  else {
                  
						colors[msg.guild.id] = {
							colors: msg.content
						};
						fs.writeFile(`${settings.directory}/colors.nvac`, JSON.stringify(colors), (err) => {
							if (err) console.log(err);
						});
					}    
					msg.channel.send(':gear: Set the color to ' + colors[msg.guild.id].colors);
		          scollector.stop();
				});
			}else if(msg.content == 'exit' || 'Exit'){
				msg.channel.send(':gear: Setup has exited.');
				collector.stop();
			}else {
				msg.channel.send(':gear: Unknown Command. Exiting setup.');
				collector.stop();
			}
		});
	}catch(e){throwE(e);}
};
exports.conf = {
	aliases: [],
	guildOnly: true,
};
exports.help = {
	name: 'setup',
	description: 'Setup NOVA guild functions',
	usage: 'nva:setup',
	category: '- Moderation Commands',
};
  
