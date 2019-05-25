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
  const fs = require("fs");
  let settings = JSON.parse(fs.readFileSync("/home/se/htdocs/private/js/nova/settings.nvac", "utf8"));
  let images = JSON.parse(fs.readFileSync(`${settings.directory}/images.nvac`, "utf8"))
  let prefixes = JSON.parse(fs.readFileSync(`${settings.directory}/prefixes.nvac`, "utf8"))
  let colors = JSON.parse(fs.readFileSync(`${settings.directory}/colors.nvac`, "utf8"))
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
  if (!msg.member.hasPermission(8) || msg.author.id != "472923135965003786" || msg.author.id != "299314446428274689" || msg.author.id != "242775871059001344"){
    msg.reply("Hold up! You aren't allowed to send messages using the say command!");
    return;
  }
  let repeatmsg = args.join(" ");
  msg.delete();
  msg.channel.send(`${repeatmsg}`);

    
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'say',
  description: 'The say command',
  usage: 'say',
  category: '- Utility Commands',
};
