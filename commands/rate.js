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
 *   Rate: Command for Nova
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
      let settings = JSON.parse(fs.readFileSync("/home/se/htdocs/private/js/nova/settings.nvac", "utf8"));
      let images = JSON.parse(fs.readFileSync(`${settings.directory}/images.nvac`, "utf8"));
      let prefixes = JSON.parse(fs.readFileSync(`${settings.directory}/prefixes.nvac`, "utf8"));
      let colors = JSON.parse(fs.readFileSync(`${settings.directory}/colors.nvac`, "utf8"));
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
      
      let rating = Math.floor(Math.random() * 101);
      let user = msg.mentions.users.first();
      let response;
      const member = msg.guild.member(user);


      if(!member) return msg.reply("Rate who? (Mention someone)");
      if(member.id == "189412734050238464") return msg.reply("Royce will always be a bad.");
      if(rating < 25){
          response = "seems like a bad person to me...";
      } else if (rating < 50){
          response = "seems like a pretty decent guy";
      } else if (rating < 75){
        response = "seems like a great person!";
      } else{
        response = "is literally the best person ever.";
      }
      let embed = new Discord.RichEmbed()
        embed.setTitle(`Rating`)
        embed.setDescription(("Rating: " + rating + " -- " + member.displayName + " " + response))
        embed.setColor(color)
        msg.channel.send( {embed} )
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: 'rate',
    description: 'Rate a user',
    usage: 'nva:rate (User)',
    category: '- Fun Commands',
  };
  
