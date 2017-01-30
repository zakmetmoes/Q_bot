const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const shipmodels = require ('./data/shipmodels');
const fs = require ("fs");


var newUsers = new Discord.Collection();

client.on("message", msg => {

//let prefix = "A, ";
	
// first checks

	if (!msg.content.startsWith(config.prefix)) return;
	if(msg.author.bot) return;

	//if(msg.content) msg.channel.sendMessage("testing");
	if(msg.content.startsWith(config.prefix + "test")){
		let args = msg.content.split(" ").slice(2);

		msg.channel.sendMessage("nothing to test");

	}
	else if(msg.content.startsWith(config.prefix + "show" )){
		let args = msg.content.split(" ").slice(2);
		//msg.channel.sendMessage(getShipPic(args[0],msg));
		getShipPic(args[0], msg);
		console.log("request ship: "+ args[0]);
	}

    else if (msg.content.startsWith(config.prefix + "ping")) {
        msg.channel.sendMessage("pong!");
    }
    else if (msg.content.startsWith(config.prefix + "foo")) {
      msg.channel.sendMessage("bar!");
    }
    else if (msg.content.startsWith(config.prefix + "kick")){
    	let userToKick = msg.mentions.users.first();
    	msg.guild.member(userToKick).kick();
    	msg.channel.sendMessage(userToKick + "has been kicked" );
    }


});

client.on("guildMemberAdd", (member) => {
	const guild = member.guild;
	newUser.set(member.user.id, member.user);

	if(newUsers.size >10);
});

client.on("guildMemberRemove", (member) => {
	if(newUsers.exists("id", member.user.id)) newUsers.delete(member.user.id);
});


function getShipPic(shipName, msg){
	//msg.channel.sendMessage("shipName my ass");
	try {
			msg.channel.sendMessage(
			"**offense " + shipmodels[shipName].offense + 
			", defense "+ shipmodels[shipName].defense + 
			", utility " + shipmodels[shipName].utility + 
			"**");

			msg.channel.sendMessage(shipmodels[shipName].picture);
		}
		catch(err){
			console.log("error: " + err);
		}

}

client.on('ready', () => {
	client.user.setAvatar('./pics/IX209.PNG');
	client.user.setGame("Fractured space");
  console.log('I am ready!');
});

client.login(config.token);