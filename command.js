var commands = {
  help: require('./commands/help.js'),
  nieuwklas: require("./commands/nieuwKlas.js"),
  verwijderklas: require("./commands/verwijderKlas.js"),
  klas: require("./commands/klas.js"),
  zetklastoestemming: require("./commands/zetKlasToestemming.js")
};

// test: 747357323152064632
// real: 747804849219043419
const botAdminRole = "747804849219043419";

exports.doCommand = function(message) {
  var command = message.content.split(" ")[0].substring(1).toLowerCase() // split the by spaces, take the first 'word',remove the ! at the beginning and convert to lowercase.
  if (commands[command]) {
    if (commands[command].normalUserAllowed || message.member.roles.cache.has(botAdminRole)) {
      commands[command].exec(message);
    } else {
      message.channel.send("Je hebt geen toestemming dat commando te gebruiken.")
    }
  } else {
    message.channel.send("Dat command bestaat niet. Typ !help om een lijst van commandos te krijgen.")
  }
};
