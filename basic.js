/*
  _   _                   ____            _      
 | \ | |                 |  _ \          (_)     
 |  \| | _____   ____ _  | |_) | __ _ ___ _  ___ 
 | . ` |/ _ \ \ / / _` | |  _ < / _` / __| |/ __|
 | |\  | (_) \ V / (_| | | |_) | (_| \__ \ | (__ 
 |_| \_|\___/ \_/ \__,_| |____/ \__,_|___/_|\___|
                                               
                                                 
    Nova, A bot designed to fit into any discord server.
    Copyright (C) 2019 Designed and Programed by Christian T. and Nayab W.

    Bot improvments by Andrew Lee
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
const Discord = require('discord.js');
const fs = require("fs");
const col = require("colors");
//let settings = JSON.parse(fs.readFileSync("/home/se/htdocs/private/js/nova/settings.nvac", "utf8"));
let settings = JSON.parse(fs.readFileSync("/home/se/htdocs/private/js/nova/settings.nvac", "utf8"));
let images = JSON.parse(fs.readFileSync(`${settings.directory}/images.nvac`, "utf8"));
let colors = JSON.parse(fs.readFileSync(`${settings.directory}/colors.nvac`, "utf8"));
const client = new Discord.Client();
global.servers = {};

const activities_list = []; // creates an arraylist containing phrases you want your bot to switch through.
  console.log(" _   _                   ____            _      \n| \\ | |                 |  _ \\          (_)     \n|  \\| | _____   ____ _  | |_) | __ _ ___ _  ___ \n| . ` |/ _ \\ \\ / / _` | |  _ < / _` / __| |/ __|\n| |\\  | (_) \\ V / (_| | | |_) | (_| \\__ \\ | (__ \n|_| \\_|\\___/ \\_/ \\__,_| |____/ \\__,_|___/_|\\___|")
  console.log(`Nova: Copyright (C) 2019 Designed and Programed by Christian T. and Nayab W.`.magenta);
  console.log('Some of the code that runs NOVΛ is based off of AstralMod, you can view AstralMods source code here: https://github.com/vicr123/AstralMod/'.magenta)
  console.log(`This is free software, and you are welcome to redistribute it`.magenta);
  console.log(`you are currently running the maintenance version of Nova.`.red);

client.on('ready', async () => {
  let channel = client.channels.find(ch => ch.id === '539142431552176139');
  let embed = new Discord.RichEmbed(); 
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setTitle("Maintenance mode initiated.")
  embed.setDescription("Nova will now run in basic mode, functionality will be limited.")
  embed.setThumbnail(`${images.error}`)
  embed.setFooter("All user and server data will still be available. please run the help command to see what commands you can run alongside which functions will be available.")
  channel.send(embed)
})

client.on('message', msg => {
  if(!msg.guild) return msg.channel.send("Nova is running in maintenance mode and commands can only be run in a guild.")
  let serverConf = JSON.parse(fs.readFileSync(`${settings.adirectory}/serverConf.nvac`, "utf8"))
  let prefixes = JSON.parse(fs.readFileSync(`${settings.adirectory}/prefixes.nvac`, "utf8"))  
  if (msg.author.bot) return;
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
    if(!serverConf.messages[msg.guild.id]){
      serverConf.messages[msg.guild.id] = {
        messages: "none"
      };
      fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
        if (err) console.log(err)
      });
    }
      if(!serverConf.member[msg.guild.id]){
        serverConf.member[msg.guild.id] = {
          member: "none"
        };
        fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
          if (err) console.log(err)
        });
    }

    
  
    var color = colors[msg.guild.id].colors
  
    var prefix = prefixes[msg.guild.id].prefixes
  } else {
    var prefix = `${settings.prefix}`
    var color = `${settings.color}`
  }
  if(msg.content === '<@538760613082693653>'){
    msg.channel.send("Hi there! To see my commands please use \`"+prefix+"help\`. Please note that Nova is currently running in maintenance mode and some commands will not be available")
  }

  try{
      
  if(msg.content == prefix+'help'){
    let embed = new Discord.RichEmbed
    embed.setAuthor("Nova Basic help", client.user.avatarURL)
    embed.setTitle(`Nova Basic help menu, current prefix: \`${prefix}\``)
    embed.setThumbnail(`${images.unknown}`)
    embed.setDescription("Nova is running in maintenance mode, functionality will be limited.")
    embed.addField("System commands", "ping\nheartbeat\nuptime")
    embed.addField("Utility commands", "avatar\nhelp\nabout")
    embed.addField("Moderation commands", "kick\nban")
    embed.setFooter("Use "+prefix+"help to see all of my commands, running in mainenance mode.");
    msg.channel.send(embed)
  }
  else if(msg.content == prefix+"ping"){
		let pingtime = Date.now();

    let embed = new Discord.RichEmbed;
    embed.setAuthor("Nova Basic ping", client.user.avatarURL)
		embed.setTitle("System status");
		embed.setDescription(`Ping: calculating...`);
		embed.setThumbnail(`${images.ping}`);
		embed.setFooter("Use "+prefix+"help to see all of my commands, running in mainenance mode.");
		msg.channel.send({embed}).then(function(msg) {
			let time = Date.now() - pingtime;
			embed.setDescription(`Ping: ${time.toString()}ms`);
			return msg.edit({embed});
  
		});
  } else if(msg.content == prefix+"heartbeat"){
    let heartbeat = Math.round(client.ping);
    let embed = new Discord.RichEmbed
    embed.setAuthor("Nova Basic heartbeat", client.user.avatarURL)
    embed.setTitle("System status")
    embed.setThumbnail(`${images.ping}`)
    embed.setDescription(`The current heartbeat is ${heartbeat}ms.`)
    embed.setFooter("Use "+prefix+"help to see all of my commands, running in mainenance mode.");
    return msg.channel.send(embed)
  } else if(msg.content.startsWith(prefix+"avatar")){
    let user = msg.mentions.users.first();
	  if (user) {
		  const member = msg.guild.member(user);
		  if (member) {
			  let embed = new Discord.RichEmbed();
			  embed.setAuthor(msg.author.username, msg.author.avatarURL);
			  embed.setTitle("Profile Picture");
			  embed.setImage(user.avatarURL);
			  embed.setFooter("Use "+prefix+"help to see all of my commands");
			  msg.channel.send({embed});   
		  }
	  }else{
		  let embed = new Discord.RichEmbed();
		  embed.setAuthor(msg.author.username, msg.author.avatarURL);
		  embed.setTitle("Profile Picture");
		  embed.setImage(msg.author.avatarURL);
		  embed.setFooter("Use "+prefix+"help to see all of my commands");
		  msg.channel.send({embed});     
	  }
  } else if(msg.content.startsWith(prefix+"about")){
    let embed = new Discord.RichEmbed;
    embed.setAuthor(msg.author.username, msg.author.avatarURL);
    embed.setTitle("General information");
    embed.setThumbnail(`${images.logo}`);
    embed.setDescription("Nova is a general purpose bot meant to fulfill all of the needs of the average Discord server.");
    embed.addField("Important information:", "this is the basic version of Nova, right now the bot is under maintenance.");
    embed.addField("Developers", "Swingin30#9105\nTechLion#1789\nAlee#0014");
    embed.addField("Special thanks to:", "cylex#2831, vicr123#4567, Squid Grill#6238, reflectronic#6230.");
    embed.addField("Sources", "AstralMod, Suzu");
    embed.addField("Links", "Help support the developers that made this possible using these platforms:\n[Nova Github](https://github.com/software-elevated/Nova)\n[AstralMod Github](https://github.com/vicr123/AstralMod/)\n[Discord](https://discord.gg/3VNHTBg)");
    embed.setFooter("Use "+prefix+"help to see all of my commands");
    msg.channel.send({embed});
  }else if(msg.content == prefix+"uptime"){
    uptime = client.uptime;
		var seconds = Math.round(uptime / 1000);
		var minutes = 0;
		var hours = 0;
		var days = 0;
 
		while(seconds >= 60){
			seconds -= 60;
			minutes += 1;
		}
		while(minutes >= 60){
			minutes -= 60;
			hours += 1;
		}
		while(hours >= 24){
			hours -= 24;
			days += 1;
		}
		let embed = new Discord.RichEmbed;
		embed.setTitle("Current client uptime");
		embed.setAuthor(msg.author.username, msg.author.avatarURL);
		embed.addField("Nova Basic has been online for:",  `${days} Days, ${hours} Hours, ${minutes} Minutes, and ${seconds} Seconds.`);
		embed.setThumbnail(`${images.clock}`);
		embed.setFooter("Use "+prefix+"help to see all of my commands");
		msg.channel.send({embed});
  } else if(msg.content.startsWith(prefix+"ban")){
    if (!msg.member.hasPermission("BAN_MEMBERS")){
      msg.reply("Hold up! You aren't allowed to ban members!");
      return;
    }
    let user = msg.mentions.users.first();
    const member = msg.guild.member(user);
    if (member) {
      member.ban("Ban by " + msg.author.username + " using Nova.").then(() => {
        msg.reply(`Successfully banned ${user.tag}`);
      }).catch(err => {
        throwE(err);
      });
    }
  }else if(msg.content.startsWith(prefix+"kick")){
    if(!msg.member.hasPermission("KICK_MEMBERS")){
      msg.reply("Hold up! You aren't allowed to kick members!");
      return;
    }
    let user = msg.mentions.users.first();
    const member = msg.guild.member(user);
    if (member) {
      member.kick("Kicked by " + msg.author.username + " using Nova.").then(() => {
        msg.reply(`Successfully kicked ${user.tag}`);
      }).catch(err => {
        throwE(err);
      });
    }
    
  }else if(msg.content == prefix+"exit"){
    const botManager = require("/home/se/htdocs/private/js/botManager").data;
    let requesterID = msg.author.id;
		if (msg.author.id == "472923135965003786" || msg.author.id == "299314446428274689" || msg.author.id == "242775871059001344"){
			let channel = client.channels.find(ch => ch.id === "539142431552176139"); 
			let embed2 = new Discord.RichEmbed();
			embed2.setTitle("Exit maintenance mode");
			embed2.setThumbnail(`${images.timer5sec}`);
			embed2.setColor(color);
			embed2.setDescription("Are you sure you want to exit maintenance mode and restart nova?");
			msg.channel.send(embed2).then(function(msg) {
				msg.react("🚫");

				let timeout = setTimeout(function() {
					msg.clearReactions();
					embed2.setDescription("exit confirmed, nova will now restart.");
					embed2.setThumbnail(`${images.off}`);
					msg.edit(embed2);
					channel.setTopic("uptime: 0/0/0")
						.catch(console.error);

          console.log("Powering off...".magenta);
          botManager.startBot()
					let mainembed = new Discord.RichEmbed();
					mainembed.setAuthor(msg.author.username, msg.author.avatarURL);
					mainembed.setTitle("Power off");
					mainembed.setColor(0xff0000);
					mainembed.setDescription(`Nova basic shut down on ${new Date()}`);
					mainembed.setThumbnail(`${images.off}`);
					mainembed.setFooter("to confirm restart, please check the console");
					channel.send(mainembed);


					client.user.setStatus("invisible");
					setTimeout(() =>{
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
					embed2.setThumbnail(`${images.cancel}`);
					embed2.setFooter("Alright, I've cancelled the shutdown");
					msg.edit(embed2);
				});
			});
		} else {
			msg.reply("Hold up! You aren't a dev! :thinking:");
			return;
		}
  }else if(msg.content.startsWith(prefix)){
    let embed = new Discord.RichEmbed
    embed.setAuthor(msg.author.username, msg.author.avatarURL)
    embed.setTitle("Unknown command")
    embed.setThumbnail(`${images.unknown}`)
    embed.setDescription(`There was an error processing that, we couldn't find that command, if you feel this is a mistake, please contact a developer [here](https://discord.gg/RFXArBN)`)
    embed.setFooter("Nova Basic");
    embed.setColor("RED");
    return msg.channel.send(embed)
  }
  
} catch (error) {
  console.log(error)
}
function throwE(e){
  let embed = new Discord.RichEmbed();
  embed.setTitle("An error has occured.");
  embed.setThumbnail(`${images.error}`)
  embed.addField("We... had a bit of trouble processing that, here's why: ", "```" + e + "```");
  embed.setFooter("Nova v" + settings.version)+". If you want you can report this error [here](https://discord.gg/RFXArBN)";
  embed.setColor("RED");
  msg.channel.send(embed);
  console.error(e);
}
});


client.on('guildMemberAdd', member => {
  let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, "utf8"))
  if (serverConf.member[member.guild.id].member == "none") return;
    channel = client.channels.find(ch => ch.id === serverConf.member[member.guild.id].member);
    channel.send(":arrow_right: " + member.user.tag);
  });
  client.on('guildMemberRemove', member => {
    let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, "utf8"))

    if (serverConf.member[member.guild.id].member == "none") return;

    let channel = client.channels.find(ch => ch.id === serverConf.member[member.guild.id].member);
    channel.send(":arrow_left: " + member.user.tag);
  });
  client.on('guildBanAdd', (guild, user) => {
    let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, "utf8"))

    if (serverConf.member[guild.id].member == "none") return;
    let channel = client.channels.find(ch => ch.id === serverConf.member[guild.id].member);
    channel.send(":hammer: Banned User: " + user.tag)
  });
  client.on('guildBanRemove', (guild, user) => {
    let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, "utf8"))

    if (serverConf.member[guild.id].member == "none") return;
    let channel = client.channels.find(ch => ch.id === serverConf.member[guild.id].member);
    channel.send(":no_entry_sign: :hammer: Unbanned User: " + user.tag)
  });
client.on('messageDelete', message => {
  let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, "utf8"))

  if (serverConf.messages[message.guild.id].messages == "none") return;
  let channel = client.channels.find(ch => ch.id === serverConf.messages[message.guild.id].messages);
  let embed = new Discord.RichEmbed();
    embed.setTitle(":wastebasket: Message Delete");
    embed.setColor(0xFF0000);
    embed.setDescription('Message by ' + message.author.username + ' deleted on ' + new Date().toString());
    embed.addField("Message content", message);
    channel.send({embed});
});
client.on('messageUpdate', (oldMessage, newMessage) => {
  let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, "utf8"))

  if (serverConf.messages[oldMessage.guild.id].messages == "none") return;
  let channel = client.channels.find(ch => ch.id === serverConf.messages[oldMessage.guild.id].messages);
  if (oldMessage == newMessage) return;
  if (oldMessage.content == "" || newMessage.content == "") return;
    let embed = new Discord.RichEmbed();
    embed.setTitle(":pencil: Message Edit");
    embed.setColor(0xFF4500);
    embed.setDescription('Message by ' + oldMessage.author.username + ' edited on ' + new Date().toString());
    embed.addField("Old Message", oldMessage);
    embed.addField("New Message", newMessage);
    channel.send({embed});
});
let logintoken = JSON.parse(fs.readFileSync(`${settings.adirectory}/config.nvac`, "utf8"))
client.login(logintoken.token).catch(function() {
  console.log('hey uh, Login failed. The token that you put in is most likely invalid, please put in a new one...'.red);
  process.exit(0);
});