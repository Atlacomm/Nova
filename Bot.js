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
const fs = require('fs');
const col = require('colors');
let settings = JSON.parse(fs.readFileSync('/home/se/htdocs/private/js/nova/settings.nvac', 'utf8'));
let images = JSON.parse(fs.readFileSync(`${settings.directory}/images.nvac`, 'utf8'));
const client = new Discord.Client();
global.servers = {};

//Fancy Terminal ASCII Art
console.log('...............................................................................\n..........%%%%,....%%%%,...,%%%%%%%%/...%%%%#..../%%%%..../%%%%%%..............\n.........,%%%%%/...%%%%,..%%%%%%%%%%%%,.(%%%%....%%%%#...,%%%%%%%%.............\n.........,%%%%%%%..%%%%,.(%%%%*...%%%%%..%%%%*..,%%%%....%%%%.%%%%*............\n.........,%%%%%%%%.%%%%,.%%%%%....%%%%%..*%%%%..%%%%(...*%%%%.,%%%%............\n.........,%%%%.%%%%%%%%,.%%%%%....%%%%%...%%%%,.%%%%....%%%%...%%%%*...........\n.........,%%%%..%%%%%%%,.(%%%%*...%%%%%...,%%%#(%%%*...#%%%%....%%%%...........\n.........,%%%%...*%%%%%,..%%%%%%%%%%%%,....%%%%%%%%....%%%%,....%%%%(..........\n.........,%%%%.....%%%%....,%%%%%%%%*......,%%%%%%,...#%%%%.....#%%%%..........\n...............................................................................'.magenta);
console.log('Nova: Copyright (C) 2019 Designed and Programed by Christian T. and Nayab W.'.magenta);
console.log('Some of the code that runs NOVΛ is based off of AstralMod, you can view AstralMods source code here: https://github.com/vicr123/AstralMod/'.magenta);
console.log('This is free software, and you are welcome to redistribute it'.magenta);
console.log(`This version of Nova runs on nvaUX ${settings.version}`.magenta);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir(`${settings.directory}/commands`, (err, files) => {
	// Load Commands | Command Handler by jtsshieh and modified by Alee
	if (err) console.error(err);
	console.log(`Loading a total of ${files.length} commands into the memory.`.cyan);
	files.forEach(file => {
		try {
			const command = require(`./commands/${file}`);
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			process.stdout.write(`attempting to load the command "${command.help.name}".`.cyan);
			client.commands.set(command.help.name, command);
		}
		catch (err) {
			console.log('An error has occured trying to load a command. Here is the error.'.red);
			console.log(err.stack);
		}
	});
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log('Command Loading complete!'.green);
});

client.on('ready', async () => {
	client.user.setGame(`Nova v${settings.version}`);
	let channel = client.channels.find(ch => ch.id === '539142431552176139');
	let embed = new Discord.RichEmbed(); 
  
	try{ 
		//NOVA Spinner
		var twirlTimer = (function() {
			var P = ['[\\] N   ', '[|] NO  ', '[/] NOV ', '[-] NOVA', '[\\]  OVA', '[|]  VA', '[/]    A', '[-]     '];
			var x = 0;
			return setInterval(function() {
				process.stdout.write('\r' + P[x++]);
				x &= 3;
			}, 500);
		})();

		embed.setTitle('N O V A');
		embed.setDescription('Nova is now starting. please wait..');
		embed.setColor(0x000000);
		embed.setThumbnail(`${images.start}`);
		embed.setFooter('Use ' + settings.prefix + 'help to see all of my commands');
		let msg = await channel.send({embed});
		setTimeout(() => {
			let heartbeat = Math.round(client.ping);
			if(heartbeat < 100){
				embed.setColor(0x00bfff);
				embed.addField(`Heartbeat: ${heartbeat}ms`, 'Normal, no attention required.');
			}
			else if(heartbeat > 100){
				embed.setColor(0xFFFF00);
				embed.addField(`Heartbeat: ${heartbeat}ms`, 'May need attention.');
			}
			else if(heartbeat > 150){
				embed.setColor(0xff0000);
				embed.addField(`Heartbeat: ${heartbeat}ms`, 'Please contact a developer, you can use suzu]about to see who to talk to about the issue');
			}
			msg.edit({embed});
		}, 1000);
		setTimeout(() => {
			embed.setColor(0xE70056);
			embed.addField('logged in', `time of login: ${new Date()}`);
			msg.edit({embed});
		}, 1500);
		setTimeout(() => {
			embed.addField('post startup checks', 'Any information about this can be seen below');
			let pingtime = Date.now();
			embed.addField('Ping','Calculating ping...');
			msg.edit({embed}).then(function(msg) {
				let time = Date.now() - pingtime;
				embed.addField('Pong!', `🛰 Total round trip ping is ${time.toString()}ms`);
				msg.edit({embed});
			});
		}, 2000);
		setTimeout(() => {
			embed.addField('nvaUX version', `${settings.version}`);
			embed.setThumbnail(`${images.done}`);
			msg.edit({embed});
			clearInterval(twirlTimer);
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(`Logged in as ${client.user.tag}`.green);
		}, 2500);   
	} catch (error) {
		console.log(error);
	}
});
  
setInterval(() => 
{
	//Update #nova-logs with the uptime
	uptime = client.uptime;
	var seconds = Math.round(uptime / 1000);
	var minutes = 0;
	var hours = 0;
	var days = 0;
	const used = process.memoryUsage().heapUsed / 1024 / 1024;
    
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
	let channel = client.channels.find(ch => ch.id === '539142431552176139');
	channel.setTopic(`Uptime: ${days}/${hours}/${minutes} memory usage: ${Math.round(used * 100) / 100}Mb`)
		.catch(console.error);
}, 120000);
  
client.on('message', msg => {
	let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));
	let prefixes = JSON.parse(fs.readFileSync(`${settings.directory}/prefixes.nvac`, 'utf8'));  
	let colors = JSON.parse(fs.readFileSync(`${settings.directory}/colors.nvac`, 'utf8'));
	
	if (msg.author.bot) return;
	if(msg.guild){ //Define all needed server options
		if(!prefixes[msg.guild.id]){
			prefixes[msg.guild.id] = {
				prefixes: settings.prefix
			};
			fs.writeFile(`${settings.directory}/prefixes.nvac`, JSON.stringify(prefixes), (err) => {
				if (err) console.log(err);
			});
		}
		if(!colors[msg.guild.id]){
			colors[msg.guild.id] = {
				colors: settings.color
			};
			fs.writeFile(`${settings.directory}/colors.nvac`, JSON.stringify(colors), (err) => {
				if (err) console.log(err);
			});
		}
		if(!serverConf.messages[msg.guild.id]){
			serverConf.messages[msg.guild.id] = {
				messages: 'none'
			};
			fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
				if (err) console.log(err);
			});
		}
		if(!serverConf.member[msg.guild.id]){
			serverConf.member[msg.guild.id] = {
				member: 'none'
			};
			fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
				if (err) console.log(err);
			});
		}
		if(!serverConf.suggest[msg.guild.id]){
			serverConf.suggest[msg.guild.id] = {
				suggest: 'none'
			};
			fs.writeFile(`${settings.directory}/serverConf.nvac`, JSON.stringify(serverConf), (err) => {
				if (err) console.log(err);
			});
		}
		var messageLog = serverConf.messages[msg.guild.id].messages;
		var memberLog = serverConf.member[msg.guild.id].member;
		var suggest = serverConf.suggest[msg.guild.id].suggest;
		var color = colors[msg.guild.id].colors;  
		var prefix = prefixes[msg.guild.id].prefixes;
	} else {
		var prefix = `${settings.prefix}`;
		var color = `${settings.color}`;
	}

	if(msg.content == '<@538760613082693653>'){ //If message only mentions NOVA, Assume help is needed. 
		msg.channel.send('Hi there! To see my commands please use \`'+prefix+'help\`');
	}
	if(msg.content.startsWith('Jarvis') || msg.content.startsWith('Friday')){ //Jarvis easter egg
		if(msg.content.substring(6).startsWith(' eliminate')) msg.channel.send('I\'ll get the suit ready, sir');
		if(msg.content.substring(6).startsWith(' critical systems status')){
			//Return nva:system (old version)
			let embed = new Discord.RichEmbed;
			let used = process.memoryUsage().heapUsed / 1024 / 1024;
			let heartbeat = Math.round(client.ping);
			let pingtime = Date.now();
			embed.setTitle('System status');
			embed.setDescription(`Ping: calculating...\nHeartbeat: ${heartbeat}ms`);
			embed.setColor(0xE70056);
			embed.setThumbnail(`${images.cog}`);
			embed.addField('memory usage', `${Math.round(used * 100) / 100}Mb`);
			embed.addField('guilds', `${client.guilds.size}`);
			embed.addField('version', `This bot is running on nvaUX ${settings.version}`);
			embed.setFooter('Use '+prefix+'help to see all of my commands');
			msg.channel.send({embed}).then(function(msg) {
				let time = Date.now() - pingtime;
				embed.setDescription(`Ping: ${time.toString()}ms\nHeartbeat: ${heartbeat}ms`);
				msg.edit({embed});
			});
		}
		if(msg.content.substring(6).startsWith(' who are you')) msg.channel.send('I am based on the AI assistant from Iron Man. I also do things TechLion asks. Like taking out the trash. Speaking of... nva:kick <@558698226249760768>');
		return;
	}

	if (!msg.content.startsWith(prefix)) return;
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift();
	let cmd;

	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	} else {
		let embed = new Discord.RichEmbed;
		embed.setAuthor(msg.author.username, msg.author.avatarURL);
		embed.setTitle('Unknown command');
		embed.setThumbnail(`${images.unknown}`);
		embed.setDescription(`There was an error processing that, we couldn't find the command \`${prefix}${command}\`, if you feel this is a mistake, please contact a developer [here](https://discord.gg/RFXArBN)`);
		embed.setFooter('nvaUX' + settings.version);
		embed.setColor('RED');
		return msg.channel.send(embed);
	}

	if (cmd) {
		if (cmd.conf.guildOnly == true) {
			if (!msg.channel.guild) {
				let goembed = new Discord.RichEmbed;
				goembed.setAuthor(msg.author.username, msg.author.avatarURL);
				goembed.setTitle('Error');
				goembed.setColor(0xE70056);
				goembed.setThumbnail(`${images.error}`);
				goembed.setDescription('This command can only be ran in a server due to compatibility issues.');
				goembed.setFooter('We\'re sorry about that!');
				return msg.channel.send(goembed);
			}
		}
		function throwE(e){
			let embed = new Discord.RichEmbed();
			embed.setTitle('An error has occured.');
			embed.setThumbnail(`${images.error}`);
			embed.addField('We... had a bit of trouble processing that, here\'s why: ', '```' + e + '```');
			embed.setFooter('Nova v' + settings.version)+'. If you want you can report this error [here](https://discord.gg/RFXArBN)';
			embed.setColor('RED');
			msg.channel.send(embed);
			console.error(e);
		}
		try {
			cmd.run(client, msg, args, throwE, suggest, color, prefix, images);
		}
		catch (e) {
			console.error(e);
		}
	}
});

client.on('guildMemberAdd', member => {
	let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));
	if (serverConf.member[member.guild.id].member == 'none') return;
	channel = client.channels.find(ch => ch.id === serverConf.member[member.guild.id].member);
	channel.send(':arrow_right: ' + member.user.tag);
});
client.on('guildMemberRemove', member => {
	let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));

	if (serverConf.member[member.guild.id].member == 'none') return;

	let channel = client.channels.find(ch => ch.id === serverConf.member[member.guild.id].member);
	channel.send(':arrow_left: ' + member.user.tag);
});
client.on('guildBanAdd', (guild, user) => {
	let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));

	if (serverConf.member[guild.id].member == 'none') return;
	let channel = client.channels.find(ch => ch.id === serverConf.member[guild.id].member);
	channel.send(':hammer: Banned User: ' + user.tag);
});
client.on('guildBanRemove', (guild, user) => {
	let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));

	if (serverConf.member[guild.id].member == 'none') return;
	let channel = client.channels.find(ch => ch.id === serverConf.member[guild.id].member);
	channel.send(':no_entry_sign: :hammer: Unbanned User: ' + user.tag);
});
client.on('messageDelete', message => {
	try{
		let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));

		if (serverConf.messages[message.guild.id].messages == 'none') return;
		if (message.author.bot) return;
		if (message.content == '') return;
		let channel = client.channels.find(ch => ch.id === serverConf.messages[message.guild.id].messages);
		let embed = new Discord.RichEmbed();
		embed.setTitle(':wastebasket: Message Delete');
		embed.setColor(0xFF0000);
		embed.setDescription('Message by ' + message.author.username + ' deleted on ' + new Date().toString());
		embed.addField('Message content', message.content);
		channel.send({embed});
	}catch(e){console.error(e);}
});
client.on('messageUpdate', (oldMessage, newMessage) => {
	try{
		let serverConf = JSON.parse(fs.readFileSync(`${settings.directory}/serverConf.nvac`, 'utf8'));
		if (oldMessage.author.bot) return;
		if (serverConf.messages[oldMessage.guild.id].messages == 'none') return;
		let channel = client.channels.find(ch => ch.id === serverConf.messages[oldMessage.guild.id].messages);
		if (oldMessage == newMessage) return;
		if (oldMessage.content == '' || newMessage.content == '') return;
		let embed = new Discord.RichEmbed();
		embed.setTitle(':pencil: Message Edit');
		embed.setColor(0xFF4500);
		embed.setDescription('Message by ' + oldMessage.author.username + ' edited on ' + new Date().toString());
		embed.addField('Old Message', oldMessage.content);
		embed.addField('New Message', newMessage.content);
		channel.send({embed});
	}catch(e){console.error(e);}
});
let logintoken = JSON.parse(fs.readFileSync(`${settings.directory}/config.nvac`, 'utf8'));
client.login(logintoken.token).catch(function() {
	console.log('hey uh, Login failed. The token that you put in is most likely invalid, please put in a new one...'.red);
	process.exit(0);
});
