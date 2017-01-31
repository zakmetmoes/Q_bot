const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const shipmodels = require ('./data/shipmodels.json');
const fs = require ("fs");
const str = require ('./commandText.json');

let countDownVal = 0;
let userToKick = 0;
let testVal = 0;


var newUsers = new Discord.Collection();

client.on("message", msg => {


// test if the message starts with the prefix and is not send
// by the bot itself, else return;
	if (!msg.content.startsWith(config.prefix)) return;
	if(msg.author.bot) return;

// you can use the test command to test new ideas
//
	if(msg.content.startsWith(config.prefix + "test")){
		msg.channel.sendMessage("hello world");
	//	msg.channel.sendMessage(client.user.lastMessageID);
		// let testInt = 0;
		// testVal++;
		// if(testVal == 1) {
		// 	msg.channel.sendMessage("testing");
		// }
		
		// if(testVal == 2){
		// 	msg.edit("new message");
			
		// }

				
	}

	// command "show" shows the specs of the ship in the 2nd command
	else if(msg.content.startsWith(config.prefix + "show" )){
		let args = msg.content.split(" ").slice(2);
// put all words seperated by spaces in an array 
// NOTE: slice(2) means delete first 2 arguments
// this would normally be one but our prefix has a space too.
		if(args[0] != "undefined" ){
		getShipData(args[0], msg); 
		}
		else msg.channel.sendMessage("ship was undefined");
	}

//well..
    else if (msg.content.startsWith(config.prefix + "ping")) {
        msg.channel.sendMessage("pong!");
    }
    else if (msg.content.startsWith(config.prefix + "foo")) {
      msg.channel.sendMessage("bar!");
    }


// command "kick". kicks the mentioned user.
    else if (msg.content.startsWith(config.prefix + "kick")){	

		//checks if the user has the permission to kick members
		let perms = msg.channel.permissionsFor(msg.member).hasPermission("KICK_MEMBERS"); 
					
		if(perms){     													
		userToKick = msg.mentions.users.first();
		msg.channel.sendMessage(str.kickUserStart);		
		countDownVal = 6;
		kickTimer = setInterval(function(){kickCountDown(msg)} , 1000);

    	}
    	else{ // message if you have no permission to kick members. 							//TO DO: add check to see if the bot has permission
    		msg.channel.sendMessage(str.kickDenied);
    	}
	}
});

function kickCountDown(msg){
	countDownVal--;
	if(countDownVal > 0)
	//	msg.edit(countDownVal);
	msg.channel.sendMessage(countDownVal);
	else{
		clearInterval(kickTimer);
		//now kick some ass
		msg.channel.sendMessage(str.kickUserEnd + userToKick);
		//let userToKick = msg.mentions.users.first(); //select mentioned user
    	msg.guild.member(userToKick).kick(); 		//kick user
    	
	}
}


// this is not working yet (i think)
client.on("guildMemberAdd", (member) => {
	const curGuild = member.guild;
	curGuild.channels.get(curGuild.id).sendMessage(member.user + str.memberJoined);

});

// whenever a user leaves the guild, do this
client.on("guildMemberRemove", (member) => {
	const curGuild = member.guild;	//what's the guild?
	curGuild.channels.get(curGuild.id).sendMessage(member.user + str.memberLeft);

});


//uses string input of the user to find the properties of the ship in the list in data/shipmodels
function getShipData(shipName, msg){

	try {
			msg.channel.sendMessage(
			"**offense " + shipmodels[shipName].offense + 
			", defense "+ shipmodels[shipName].defense + 
			", utility " + shipmodels[shipName].utility + 
			"**");

			msg.channel.sendMessage(shipmodels[shipName].picture); //sens websitelink to picture
		}
		catch(err){ //not all ships have all properties yet
			//console.log("error: " + err);
			msg.channel.sendMessage("something went wrong");
		}

}



//login init
client.on('ready', () => {
	client.user.setAvatar('./pics/IX209.PNG'); 
	client.user.setGame(str.playing);
  console.log('I am ready!');
});

client.login(config.token);