/************************************************************************************************
 *...............................................................................
 *..........%%%%,....%%%%,...,%%%%%%%%/...%%%%#..../%%%%..../%%%%%%..............
 *.........,%%%%%/...%%%%,..%%%%%%%%%%%%,.(%%%%....%%%%#...,%%%%%%%%.............
 *.........,%%%%%%%..%%%%,.(%%%%*...%%%%%..%%%%*..,%%%%....%%%%.%%%%*............
 *.........,%%%%%%%%.%%%%,.%%%%%....%%%%%..*%%%%..%%%%(...*%%%%.,%%%%............
 *.........,%%%%.%%%%%%%%,.%%%%%....%%%%%...%%%%,.%%%%....%%%%#((%%%%*...........
 *.........,%%%%..%%%%%%%,.(%%%%*...%%%%%...,%%%#(%%%*...#%%%%%%%%%%%%...........
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
    const images = require('../images.json');
    if (msg.author.id == "472923135965003786" || msg.author.id == "299314446428274689" || msg.author.id == "242775871059001344"){
        let channel = client.channels.find(ch => ch.id === '539142431552176139'); 
        let embed2 = new Discord.RichEmbed();
        embed2.setTitle("Shutdown")
        embed2.setThumbnail(`${images.off}`)
        embed2.setColor(0xE70056)
        embed2.setDescription("The shutdown command was initiated. countdown is unfortunately unavailable.")
        embed2.setFooter("this was logged in the space station")
          await msg.channel.send(embed2)

        channel.setTopic(`uptime: 0/0/0`)
        .catch(console.error);

        console.log('Powering off...'.magenta);
        let embed = new Discord.RichEmbed();
        embed.setAuthor(msg.author.username, msg.author.avatarURL)
        embed.setTitle("Power off");
        embed.setColor(0xff0000);
        embed.setDescription('Nova will shut down now.');
        embed.setThumbnail(`${images.off}`);
        embed.setFooter("This may take a while...");
        let reply = await channel.send({embed})
        setTimeout(() =>{
            embed.setDescription("Shutdown completed, goodbye!")
            embed.setThumbnail(`${images.done}`)
            embed.setFooter("client is now shut down")
            reply.edit({embed})
        }, 3500);


        client.user.setStatus('invisible');
        setTimeout(() =>{
          process.exit(0);
        }, 4000);
      } else {
        msg.reply("Hold up! You aren't a dev! :thinking:");
        return;
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