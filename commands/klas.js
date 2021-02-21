const fs = require('fs');

exports.normalUserAllowed = true;

exports.exec = function(message) {
  var klasName = message.content.substring("!klas ".length).toLowerCase(); // remove the !nieuwKlas at the start and convert to lowercase.
  var klasData = JSON.parse(fs.readFileSync("data/klassen.json"));
  if (!klasData.studentSlefAssignAllowed) {
    message.channel.send("leerlingen kunnen (tijdelijk) niet zelf hun klas aanpassen.");
    return;
  }
  if (klasName.length == 0) { // if no klas was specified, so !klas was type but no klas was mentioned.
    var klasListTXT = "Hier is een lijst met klassen met de commandos om in die klas te gaan:";
    var klasCount = 0;
    for (var klas in klasData.klassen) {
      klasListTXT += "\n`!klas " + klas + "`";
      klasCount ++;
    }
    if (klasCount == 0) {
      message.channel.send("Er staan geen klassen geregistreerd in de bot. Een botadmin moet `!nieuwKlas <klasNaam>` gebruiken om nieuwe klassen aan te maken en te koppellen aan bestaande of nieuwe Discord rollen.");
      return;
    }
    message.channel.send(klasListTXT).catch(function(error) {
      message.channel.send("Er is een fout opgetreden bij het versturen van de lijst met klassen:\n```" + error + "```").catch(function(errorMSG) {
        message.channel.send("Er is een fout opgetreden bij het versturen van de lijst met klassen.");
        console.log("Er is een fout opgetreden bij het versturen van de lijst met klassen:\n" + error + "\n en een fout bij het verzenden van de error:\n" + errorMSG);
      });
    });
    return;
  }
  if (klasData.klassen[klasName]) {
    var klasRolesAlreadyOwned = [];
    var klassenIDs = [];
    for (var klas in klasData.klassen) {
      klassenIDs.push(klasData.klassen[klas].id);
    }
    message.member.roles.cache.forEach(function(role) {
      if (klassenIDs.includes(role.id)) { // if member already has klas role
        message.member.roles.remove(role.id).catch(function(error) { // remove that klas role
          console.log(`Error in removing existing klas role on executing command:\n${message.content}\nSent by ${message.author.tag} with id ${message.author}\nhere is the error:\n${error}`);
        });
      }
    });
    message.member.roles.add(klasData.klassen[klasName].id).then(function() {
      message.channel.send("Je bent aan de klas toegevoegd.");
    }).catch(function(error) {
      console.log(`Error in adding klas role to member on executing command:\n${message.content}\nSent by ${message.author.tag} with id ${message.author}\nhere is the error:\n${error}`);
      message.channel.send("Er is een fout opgetreden bij het geven van de klassen rol:\n```" + error + "```").catch(function(errorMSG) {
        message.channel.send("Er is een fout opgetreden bij het geven van de klassen rol.");
      });
    });
  } else { // requested klas role doesnt exist:
    message.channel.send("Die klas bestaat niet. Typ `!klas` zonder klas erachter om een lijst van klassen te krijgen.");
  }
}
