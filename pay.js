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
 *   Command here: Pay command
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
module.exports.run = async (client, msg, args, throwE, suggest, color, prefix, images, coins, settings) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    let pUser = msg.author;
    let rUser = msg.mentions.users.first() || args[0];
    if(!args[0]){
        return msg.reply("You need to mention a user to pay them!")
    }
    if(pUser == rUser) return msg.reply("You cant pay yourself!")
    if(!rUser){
        let embed = new Discord.RichEmbed;
        embed.setAuthor('Nova Pay', msg.author.avatarURL);
        embed.setTitle("Transaction Declined");
        embed.setThumbnail(`${images.npay}`)
        embed.setDescription("We were not able to find the user mentioned, please try again with a valid user");
        embed.setFooter('Use '+prefix+'help to see all of my commands');
        return msg.channel.send(embed);
    }
    if(!coins[rUser.id]){
        let embed = new Discord.RichEmbed;
        embed.setAuthor('Nova Pay', msg.author.avatarURL);
        embed.setTitle("Transaction Declined");
        embed.setThumbnail(`${images.npay}`)
        embed.setDescription("The mentioned user does not have a balance yet or they do not exist, they need to send a message in a Nova enabled server first.");
        embed.setFooter('Use '+prefix+'help to see all of my commands');
        return msg.channel.send(embed);
    }

    var pAmt = args[1]

    if(!args[1]){
        return msg.reply("You need to specify an amount to pay the user!")
    }

    if(isNaN(pAmt || args[1])){
        let embed = new Discord.RichEmbed;
        embed.setAuthor('Nova Pay', msg.author.avatarURL);
        embed.setTitle("Transaction Declined");
        embed.setThumbnail(`${images.npay}`)
        embed.setDescription("The amount specified is not a number, please specify a number to pay the user.");
        embed.setFooter('Use '+prefix+'help to see all of my commands');
        return msg.channel.send(embed);
    }

    if(pAmt < 1){
        var pAmt = pAmt * -1
    }

    var pAmt = Math.round(100*pAmt)/100;
    if(pAmt > coins[pUser.id].coins){
        let embed = new Discord.RichEmbed;
        embed.setAuthor('Nova Pay', msg.author.avatarURL);
        embed.setTitle("Transaction Declined");
        embed.setThumbnail(`${images.npay}`)
        embed.setDescription("you have insufficient funds to pay the user that amount, please specify a number to pay the user.");
        embed.setFooter('Use '+prefix+'help to see all of my commands');
        return msg.channel.send(embed);
    }

    coins[pUser.id] = {
        coins: coins[pUser.id].coins - pAmt
    };
    coins[rUser.id] = {
        coins: coins[rUser.id].coins + pAmt
    };
    fs.writeFile(`${settings.directory}/coins.nvac`, JSON.stringify(coins), (err) => {
        if (err) console.log(err);
    });

    let embed = new Discord.RichEmbed;
    embed.setAuthor('Nova Pay', msg.author.avatarURL);
    embed.setTitle("Transaction Completed");
    embed.setThumbnail(`${images.npay}`)
    embed.setDescription(`${rUser.username} has been payed $${pAmt}!`);
    embed.addField("Balances", `${rUser.username}: $${coins[rUser.id].coins}\n${pUser.username}: $${coins[pUser.id].coins}`)
    embed.setFooter('Use '+prefix+'help to see all of my commands');
    msg.channel.send(embed);
    

};

exports.conf = {
	aliases: [],
	guildOnly: false,
};
exports.help = {
	name: 'pay',
	description: 'transfers currency from one account to another',
	usage: 'nva:pay <mention a user> <amount to pay>',
    category: '- Economy commands'};