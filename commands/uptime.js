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
  const Discord = require('discord.js');
  const fs = require("fs")
  let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"))
  let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"))
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"))
  try{
  if(!prefixes[msg.guild.id]){
    prefixes[msg.guild.id] = {
      prefixes: settings.prefix
    };
  }
  let prefix = prefixes[msg.guild.id].prefixes
    uptime = client.uptime;
    var seconds = Math.round(uptime / 1000)
    var minutes = 0
    var hours = 0
    var days = 0
 
    while(seconds >= 60){
        seconds -= 60
        minutes += 1
    }
    while(minutes >= 60){
        minutes -= 60
        hours += 1
    }
    while(hours >= 24){
        hours -= 24
        days += 1
    }
    let embed = new Discord.RichEmbed
    embed.setTitle("Current client uptime")
    embed.setAuthor(msg.author.username, msg.author.avatarURL)
    embed.addField(`Nova has been online for:`,  `${days} Days, ${hours} Hours, ${minutes} Minutes, and ${seconds} Seconds.`)
    embed.setColor(0xE70056)
    embed.setThumbnail(`${images.clock}`)
    embed.setFooter("Use "+prefix+"help to see all of my commands")
    await msg.channel.send({embed});
  }catch(e){
    throwE(e)
  }
 };

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'uptime',
  description: 'The uptime command',
  usage: 'uptime',
  category: '- System Commands',
};