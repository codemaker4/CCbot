const Discord = require('discord.js');
const client = new Discord.Client();
var botID;

const command = require('./command.js');

client.once('ready', () => {
	console.log('Ready!');
  botID = client.user.id;
});

client.on('message', message => {
  if (message.author.id == botID) {
    // console.log("recieved own message", message.content);
    return;
  }
  if (message.content[0] == "!") {
    try {
      command.doCommand(message);
    } catch(error) {
      console.log(`Error on executing command:\n${message.content}\nSent by ${message.author.tag} with id ${message.author}\nhere is the error:\n${error}`)
      message.channel.send("Er is een fout opgetreden bij het uitvoeren van het commando:\n```" + error + "```").catch(function(errorMSG) {
        message.channel.send("Er is een fout opgetreden bij het uitvoern van het commando.");
      })
    }
  }
});

client.login(require("./auth.json").token);
