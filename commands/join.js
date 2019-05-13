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
  let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"))
  let embed = new Discord.RichEmbed();
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"))
  if(!prefixes[msg.guild.id]){
    prefixes[msg.guild.id] = {
      prefixes: settings.prefix
    };
  }
  let prefix = prefixes[msg.guild.id].prefixes
  
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'commandnamehere',
  description: 'The commandnamehere command',
  usage: 'commandnamehere',
  category: '- Utility Commands',
};