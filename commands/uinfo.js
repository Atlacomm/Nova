module.exports.run = async (client, msg, args, throwE) => {
  const Discord = require('discord.js');
  const fs = require("fs");
  let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"));
  let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"))
    let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"))
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.nvac", "utf8"))
    let colors = JSON.parse(fs.readFileSync("./colors.nvac", "utf8"))
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

  if (!args[0]) {
    person = person = message.guild.member(message.author);
    let embed = new Discord.RichEmbed()
    .setTitle("User Information Lookup")
    .setDescription("Very Interesting...")
    .addField("Username", (person.user.tag), true)
    .addField("Display Name", (person.displayName), true)
    .addField("Highest Role", (person.highestRole), true)
    .addField("Current Voice Channel", (person.voiceChannel), true)
    .addField("Joined Discord On", (person.user.createdAt))
    .addField("Joined Guild On", (person.joinedAt))
    .setThumbnail(person.user.avatarURL)
    .setFooter("Use "+prefix+"help to see all of my commands");
    message.channel.send( {embed} )
  } else {
    person = message.guild.member(message.mentions.users.first());
    let embed = new Discord.RichEmbed()
    .setTitle("User Information Lookup")
    .setDescription("Very Interesting...")
    .addField("Username", (person.user.tag), true)
    .addField("Display Name", (person.displayName), true)
    .addField("Highest Role", (person.highestRole), true)
    .addField("Current Voice Channel", (person.voiceChannel), true)
    .addField("Joined Discord On", (person.user.createdAt))
    .addField("Joined Guild On", (person.joinedAt))
    .setThumbnail(person.user.avatarURL)
    .setFooter("Use "+prefix+"help to see all of my commands");

    message.channel.send( {embed} )
  }
};

exports.conf = {
  aliases: ["user"],
  guildOnly: true,
};
exports.help = {
  name: 'uinfo',
  description: 'User information',
  usage: 'uinfo @person (returns @person\'s uinfo) OR uinfo (returns your uinfo)',
  category: '- Utility Commands',
};

    