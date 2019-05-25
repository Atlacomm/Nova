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
 *   8ball: Command for Nova
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
    try{
    let reply = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good"]
     if (args.join(" ").length <= 0) {
        message.reply("Blank is not a question! (Give me something to answer)!")
          }
      else{
    let embed = new Discord.RichEmbed()
        embed.setTitle(` **:8ball: The 8 Ball has spoken!**`)
        embed.addField("Question", (`${args.join(" ")}`))
        embed.addField("Answer", (`${reply[Math.floor(Math.random () * reply.length)]}`))
        embed.setColor(color)
        msg.reply( {embed} )
      }
    }catch(e){
        throwE(e)
    }
  };
  
  exports.conf = {
    aliases: [],
    guildOnly: false,
  };
  exports.help = {
    name: '8ball',
    description: 'Roll the magic 8ball!',
    usage: 'nva:8ball (Question)',
    category: '- Fun Commands',
  };
  