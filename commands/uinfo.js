module.exports.run = async (client, msg, args, throwE) => {
	const Discord = require("discord.js");
	const fs = require("fs");
	let settings = JSON.parse(fs.readFileSync("./settings.nvac", "utf8"));
	let images = JSON.parse(fs.readFileSync("./images.nvac", "utf8"));
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
		var prefix = prefixes[msg.guild.id].prefixes;
		var color = colors[msg.guild.id].colors;
	} else {
		var prefix = `${settings.prefix}`;
		var color = `${settings.color}`;
	}

	if (!args[0]) {
		person = person = msg.guild.member(msg.author);
		let embed = new Discord.RichEmbed();
		embed.setTitle("User Information Lookup");
		embed.setColor(color);
		embed.setDescription("Very Interesting...");
		embed.addField("Username", (person.user.tag), true);
		embed.addField("Display Name", (person.displayName), true);
		embed.addField("Highest Role", (person.highestRole), true);
		if(person.voiceChannel = null){
			var vchannel = "None";
		} else {
			var vchannel = `${person.voiceChannel}`;
		}
		embed.addField("Current Voice Channel", `${vchannel}`, true);
		embed.addField("Joined Discord On", (person.user.createdAt));
		embed.addField("Joined Guild On", (person.joinedAt));
		embed.setThumbnail(person.user.avatarURL);
		embed.setFooter("Use "+prefix+"help to see all of my commands");
		msg.channel.send( {embed} );
	} else {
		person = msg.guild.member(msg.mentions.users.first());
		let embed = new Discord.RichEmbed();
		embed.setTitle("User Information Lookup");
		embed.setColor(color);
		embed.setDescription("Very Interesting...");
		embed.addField("Username", (person.user.tag), true);
		embed.addField("Display Name", (person.displayName), true);
		embed.addField("Highest Role", (person.highestRole), true);
		if(person.voiceChannel = undefined){
			var vchannel = "None";
		} else {
			var vchannel = `${person.voiceChannel}`;
		}
		embed.addField("Current Voice Channel", vchannel, true);
		embed.addField("Joined Discord On", (person.user.createdAt));
		embed.addField("Joined Guild On", (person.joinedAt));
		embed.setThumbnail(person.user.avatarURL);
		embed.setFooter("Use "+prefix+"help to see all of my commands");

		msg.channel.send( {embed} );
	}
};

exports.conf = {
	aliases: ["user"],
	guildOnly: true,
};
exports.help = {
	name: "uinfo",
	description: "User information",
	usage: "uinfo @person (returns @person's uinfo) OR uinfo (returns your uinfo)",
	category: "- Utility Commands",
};

    
