var users = {}; // dict of "<uuid>" : <amount of recent messages>. Wordt iedere minuut geleegd.

exports.logMessage = function(message) {
    var authorid = message.author.id
    if (authorid in users) {
        users[authorid] += 1;
        if (users[authorid] > 10) {
            if (!message.member.roles.cache.has("689866057334128713") && !message.member.roles.cache.has("690178565840568421")){ // not admin or moderator
                message.member.roles.set(['696005881468289045']).then(() => { // verwijder klasssen rollen en zet de muted rol.
                    console.log(`muted ${message.author.tag} cus of spam`);
                    message.channel.send(`<@&689866057334128713> ${message.author.tag} is gemute vanwege spam.`); // pings admins
                }).catch((e) => {
                    console.log(`failed to mute spamming ${message.author.tag} cus of error:\n ${e}`);
                });
                
            } else {
                console.log(`spamming moderator ${message.author.tag}`);
            }
        }
    } else {
        users[authorid] = 1;
    }
}

var clearCountInterval = setInterval(() => {
    users = {};
}, 1000*60); // clear counter every 60 seconds.