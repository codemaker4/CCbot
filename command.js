var commands = {
  help: require('./commands/help.js'),
  nieuwklas: require("./commands/nieuwKlas.js")
};

exports.doCommand = function(message) {
  var command = message.content.split(" ")[0].substring(1).toLowerCase() // split the by spaces, take the first 'word',remove the ! at the beginning and convert to lowercase.
  if (commands[command]) {
    commands[command].exec(message);
  } else {
    message.channel.send("Dat command bestaat niet. Typ !help om een lijst van commandos te krijgen.")
  }
};
