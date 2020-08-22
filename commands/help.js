exports.exec = function(message) {
  message.channel.send(exports.helpString);
}

exports.helpString = "Hier is een lijst van commandos voor deze bot:\n";
exports.helpString += "`!help`: krijg hulp voor de bot.\n";
exports.helpString += "`!help <commando>`: krijg specifiekere instructies voor het gebruik van het gegeven commando.\n";
