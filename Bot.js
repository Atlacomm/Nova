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
    Nova, A bot designed to fit into any discord server.
    Copyright (C) 2019 Designed and Programed by Christian T. and Nayab W.

    Bot improvments by Alexander Lee
    
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
const images = require('./images.json')
const colors = require("colors");
const fs = require("fs");
const config = require ("./config.json");
const settings = require ("./settings.json");
const client = new Discord.Client();

const activities_list = []; // creates an arraylist containing phrases you want your bot to switch through.
  
  console.log(`Nova: Copyright (C) 2019 Designed and Programed by Ree and ServerLion`.gray);
  console.log (`This is free software, and you are welcome to redistribute it`.gray);
  console.log(`This version of Nova runs on nvaUX ${settings.version}`.magenta);

// Command Handler by jtsshieh and modified by Alee

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} commands into the memory.`.cyan);
  files.forEach(file => {
    try {
      const command = require(`./commands/${file}`);
      console.log(`Attempting to load the command "${command.help.name}".`.cyan);
      client.commands.set(command.help.name, command);
      command.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command.help.name);
        console.log(`Attempting to load "${alias}" as an alias for "${command.help.name}"`.cyan);
      });
    }
    catch (err) {
      console.log('An error has occured trying to load a command. Here is the error.'.red);
      console.log(err.stack);
    }
  });
  console.log('Command Loading complete!'.green);
});

  client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`.green);
  let channel = client.channels.find(ch => ch.id === '539142431552176139');
  let embed = new Discord.RichEmbed(); 
  
  try{  
    embed.setTitle("N O V A");
    embed.setDescription('Nova is now starting. please wait..');
    embed.setColor(0x000000);
    embed.setThumbnail(`${images.start}`);
    embed.setFooter("Use " + settings.prefix + "help to see all of my commands");
    let msg = await channel.send({embed})
    setTimeout(() => {
      let heartbeat = Math.round(client.ping)
      if(heartbeat < 100){
        embed.setColor(0x00bfff)
        embed.addField(`Heartbeat: ${heartbeat}ms`, "Normal, no attention required.")
      }
      else if(heartbeat > 100){
        embed.setColor(0xFFFF00)
        embed.addField(`Heartbeat: ${heartbeat}ms`, "May need attention.")
      }
      else if(heartbeat > 150){
        embed.setColor(0xff0000)
        embed.addField(`Heartbeat: ${heartbeat}ms`, "Please contact a developer, you can use suzu]about to see who to talk to about the issue")
      }
      msg.edit({embed})
    }, 1000);
    setTimeout(() => {
      embed.setColor(0xE70056);
      embed.addField('logged in', `time of login: ${new Date()}`)
      msg.edit({embed});
    }, 1500);
    setTimeout(() => {
      embed.addField("post startup checks", "Any information about this can be seen below")
      let pingtime = Date.now()
      embed.addField("Ping","Calculating ping...")
      msg.edit({embed}).then(function(msg) {
      let time = Date.now() - pingtime;
      embed.addField("pong!", `🛰 Total round trip ping is ${time.toString()}ms`)
      msg.edit({embed});
    });
    }, 2000);
    setTimeout(() => {
      embed.addField(`nvaUX version`, `this bot is running on nvaUX ${settings.version}`)
      embed.setThumbnail(`${images.done}`)
      msg.edit({embed});
    }, 2500);
    //TODO: UINFO
    //TODO: LOGGING
    //TODO: TIMERS
    //TODO: NOTE TAKING



    
  } catch (error) {
    console.log(error);
  }
  })
  
  setInterval(() => 
  {
    uptime = client.uptime;
    var seconds = Math.round(uptime / 1000)
    var minutes = 0
    var hours = 0
    var days = 0
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    
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
    let channel = client.channels.find(ch => ch.id === '539142431552176139');
    channel.setTopic(`uptime: ${days}/${hours}/${minutes} memory usage: ${Math.round(used * 100) / 100}Mb`)
    .catch(console.error);
  }, 120000);
  
  setInterval(() => 
  {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);
  client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    
  
});

client.on('message', msg => {
  if (msg.author.bot) return;



  if (!msg.content.startsWith(settings.prefix)) return;
  const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (cmd.conf.guildOnly == true) {
      if (!msg.channel.guild) {
        return msg.author.send('This command can only be ran in a guild.');
      }
    }
    try {
      cmd.run(client, msg, args);
    }
    catch (e) {
      console.error(e);
    }
  }

  try{

  if(msg.content === 'Yell at cylex'){
    msg.channel.send("cylex, nobody cares about the caps lock.")
  }
  if(msg.content.startsWith('y\'all')){
    msg.reply('I can see you are a southerner as well')
  }
  else if(msg.content.startsWith(settings.prefix) == null){
    let embed = new Discord.RichEmbed();
    embed.setTitle("Unknown Command");
    embed.setColor(0xff0000);
    embed.setDescription('Please use **'+settings.prefix+'help** to see all available commands. some commands may not be available to you depending on your role.')
    msg.channel.send({embed})
  }
} catch (error) {
  console.log(error)
}
});


client.on('guildMemberAdd', member => {
    if (member.guild.id != "537101504864190464") return;
    channel = client.channels.find(ch => ch.id === '539142431552176139');
    channel.send(":arrow_right: " + member.user.tag);
  });
  client.on('guildMemberRemove', member => {
    if (member.guild.id != "537101504864190464") return;
    let channel = client.channels.find(ch => ch.id === '539142431552176139');
    channel.send(":arrow_left: " + member.user.tag);
  });
  client.on('guildBanAdd', (guild, user) => {
    if (guild.id != "537101504864190464") return;
    let channel = client.channels.find(ch => ch.id === '539142431552176139');
    channel.send(":hammer: Banned User: " + user.tag)
  });
  client.on('guildBanRemove', (guild, user) => {
    if (user.guild.id != "537101504864190464") return;
    let channel = client.channels.find(ch => ch.id === '539142431552176139');
    channel.send(":no_entry_sign: :hammer: Unbanned User: " + user.tag)
  });

  //client.on('messageDelete', message => {
    //if (message.channel.guild.id != "537101504864190464") return;
    //let channel = client.channels.find(ch => ch.id === '539142431552176139');
    //let embed = new Discord.RichEmbed();
    //embed.setTitle(":wastebasket: Message Delete");
    //embed.setColor(0xFF0000);
    //embed.setDescription('Message by ' + message.author.username + ' deleted on ' + new Date());
    //embed.addField("Message content", message);
    //channel.send({embed});
  //});

  //client.on('messageUpdate', (oldMessage, newMessage) => {
   // try{
   // if (oldMessage.channel.guild.id != "537101504864190464") return;
   // if (oldMessage == newMessage) return;
    //if (newMessage == oldMessage) return;
    //let channel = client.channels.find(ch => ch.id === '539142431552176139');
    //let embed = new Discord.RichEmbed();
    //embed.setTitle(":pencil: Message Edit");
    //embed.setColor(0xFF4500);
    //embed.setDescription('Message by ' + oldMessage.author.username + ' edited on ' + new Date());
    //embed.addField("Old Message", oldMessage); // TODO: Fix this line
    //embed.addField("New Message", newMessage);
    //channel.send({embed});  
    //} catch (error) {
    //  console.log(error) 
    //}  
  //});
client.login(config.token).catch(function() {
  console.log('hey uh, Login failed. The token that you put in is most likely invalid, please put in a new one...'.red);
  process.exit(0);
});