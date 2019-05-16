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
module.exports.run = async (client, msg) => {
  const Discord = require('discord.js');
  const fs = require("fs")
  let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"))
  let colors = JSON.parse(fs.readFileSync("./colors.nvac", "utf8"))
  let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"))
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"))
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
    var prefix = prefixes[msg.guild.id].prefixes
    var color = colors[msg.guild.id].colors
  } else {
    var prefix = `${settings.prefix}`
    var color = `${settings.color}`
  }
  let user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        let embed = new Discord.RichEmbed();
        embed.setAuthor(msg.author.username, msg.author.avatarURL)
        embed.setTitle("Profile Picture");
        embed.setColor(color);
        embed.setImage(user.avatarURL);
        embed.setFooter("Use "+prefix+"help to see all of my commands");
        msg.channel.send({embed});   
     }
  }else{
    let embed = new Discord.RichEmbed();
    embed.setAuthor(msg.author.username, msg.author.avatarURL)
    embed.setTitle("Profile Picture");
    embed.setColor(color);
    embed.setImage(msg.author.avatarURL);
    embed.setFooter("Use "+prefix+"help to see all of my commands");
    msg.channel.send({embed});     
  }
};

exports.conf = {
aliases: [],
guildOnly: false,
};
exports.help = {
name: 'avatar',
description: 'The pic command',
usage: 'avatar',
category: '- Utility Commands',
};
