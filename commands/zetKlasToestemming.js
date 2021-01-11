const fs = require('fs');

exports.normalUserAllowed = false;

exports.exec = function (message) {
  var klasData = JSON.parse(fs.readFileSync("data/klassen.json"));
  klasData.studentSlefAssignAllowed = !klasData.studentSlefAssignAllowed;
  fs.writeFileSync("data/klassen.json", JSON.stringify(klasData));
  if (klasData.studentSlefAssignAllowed) {
    message.channel.send("Leerlingen kunnen nu zelf `!klas <klasnaam>` gebruiken om zichzelf in een klas te zetten. Typ `!zetKlasToestemming` om dit weer uit te zetten.");
  } else {
    message.channel.send("Leerlingen kunnen nu **niet** zichzelf in een klas zetten. Typ `!zetKlasToestemming` om dit weer aan te zetten.");
  }
}
