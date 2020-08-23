const fs = require('fs');

exports.exec = function(message) {
  var klasName = message.content.substring("!verwijderKlas ".length).toLowerCase(); // remove the !nieuwKlas at the start and convert to lowercase.
  var klasData = JSON.parse(fs.readFileSync("data/klassen.json"));
  if (klasData[klasName]) {
    var klasRole = message.guild.roles.cache.get(klasData[klasName].id);// get the klas role from Discord
    if (klasRole) {
      klasRole.delete("Klas rol is verwijderd namens " + message.author.tag).then(function() {
        delete klasData[klasName];
        fs.writeFileSync("data/klassen.json", JSON.stringify(klasData));
        message.channel.send("Klas is succesvol verwijderd uit Discord en de bot.");
      })
    } else {
      delete klasData[klasName];
      fs.writeFileSync("data/klassen.json", JSON.stringify(klasData));
      message.channel.send("Klas is succesvol verwijderd uit de bot. De klas rol bestond al niet (meer) in Discord.");
    }
  } else {
    message.channel.send("Die klas bestaat niet in de bot. Mocht er een Discord rol zijn voor deze klas, kun je die verwijderen in Discord. Je kan ook `!nieuwKlas <klasnaam>` gebruiken om de klas rol te koppelen aan de bot.")
  }
}
