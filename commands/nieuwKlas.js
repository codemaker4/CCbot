const fs = require('fs');

exports.exec = function(message) {
  var klasName = message.content.substring("!nieuwKlas ".length).toLowerCase(); // remove the !nieuwKlas at the start and convert to lowercase.
  var klasData = JSON.parse(fs.readFileSync("data/klassen.json"));
  var klasRole = message.guild.roles.cache.find(x => x.name === klasName); // check if a klas role with the name already exists in Discord
  if (klasData[klasName] && klasRole) { // check if the role was registered in the bot and in Discord
    message.channel.send("Die rol bestaat al en is al geregistreerd.");
    return;
  } // the role isn't registered in the bot or in Discord
  if (klasData[klasName] && !klasRole) { // if the role is registered in the bot but not in Discord:
    delete klasData[klasName]; // remove it from cached klas role file and carry on.
  }
  if (klasRole) { // if a discord role was found
    klasData[klasName] = {"id":klasRole.id};
    fs.writeFileSync("data/klassen.json", JSON.stringify(klasData));
    message.channel.send("De klas bestond al in Discord, maar stond nog niet geregistreerd. De rol is nu geregistreerd en gekoppeld aan de bestaande Discord rol.");
  } else {
    message.guild.roles.create({data:{name:klasName},reason:`Klas gemaakt namens ${message.author.tag}`}).then(function(newKlasRole) {
      klasData[klasName] = {"id":newKlasRole.id,"name":klasName};
      fs.writeFileSync("data/klassen.json", JSON.stringify(klasData));
      message.channel.send("De nieuwe klas is aangemaakt, en leerlingen kunnen het `!klas` commando gebruiken om zich aan de klas toe te voegen.");
    }).catch(function (error) {
      console.log(`Error in creating new Discord role for new class on executing command:\n${message.content}\nSent by ${message.author.tag} with id ${message.author}\nhere is the error:\n${error}`);
      message.channel.send("Er is een fout opgetreden bij het maken van de nieuwe Discord rol:\n```error```").catch(function(){
        message.channel.send("Er is een fout opgetreden bij het maken van de nieuwe Discord rol.");
      });
    });
  }
}
