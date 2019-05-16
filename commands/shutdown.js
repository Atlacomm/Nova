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
    let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"))
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
      var prefix = prefixes[msg.guild.id].prefixes
      var color = colors[msg.guild.id].colors
    } else {
      var prefix = `${settings.prefix}`
      var color = `${settings.color}`
    }
    try{
    let requesterID = msg.author.id;
    if (msg.author.id == "472923135965003786" || msg.author.id == "299314446428274689" || msg.author.id == "242775871059001344"){
        let channel = client.channels.find(ch => ch.id === '539142431552176139'); 
        let embed2 = new Discord.RichEmbed();
        embed2.setTitle("Shutdown")
        embed2.setThumbnail(`${images.timer5sec}`)
        embed2.setColor(color)
        embed2.setDescription("The shutdown command was initiated. If you want to cancel this operation, you have 5 seconds to react with 🚫 to cancel the operation.")
        await msg.channel.send(embed2).then(function(msg) {
          msg.react('🚫');

          let timeout = setTimeout(function() {
          msg.clearReactions();
          embed2.setDescription("Shutdown confirmed, nova will now shut down");
          embed2.setThumbnail(`${images.off}`)
          msg.edit(embed2);
          channel.setTopic(`uptime: 0/0/0`)
          .catch(console.error);

          console.log('Powering off...'.magenta);
          let mainembed = new Discord.RichEmbed();
          mainembed.setAuthor(msg.author.username, msg.author.avatarURL)
          mainembed.setTitle("Power off");
          mainembed.setColor(0xff0000);
          mainembed.setDescription(`Nova shut down on ${new Date()}`);
          mainembed.setThumbnail(`${images.off}`);
          mainembed.setFooter("to confirm shutdown please check the console");
          channel.send(mainembed)


          client.user.setStatus('invisible');
          setTimeout(() =>{
            console.clear()
            process.exit(0);
          }, 4000);
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
          embed2.setThumbnail(`${images.cancel}`)
          embed2.setFooter("Alright, I've cancelled the shutdown");
          msg.edit(embed2);
          });
        });
      } else {
        msg.reply("Hold up! You aren't a dev! :thinking:");
        return;
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
  name: 'shutdown',
  description: 'The shutdown command',
  usage: 'shutdown',
  category: '- Developer Commands',
};