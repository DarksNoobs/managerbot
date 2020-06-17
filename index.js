const Discord = require("discord.js");
const exp = require("./exp.json");
const config = require("./config.json");
const client = new Discord.Client();
const Enmap = require("enmap")
const fs = require("fs");
// const money = require("./money.json")
client.config = config;

/// Xp Système début

client.on('message', async message => {
  let addExp = Math.floor(Math.random() * 5) + 1;
 
  if(!exp[message.author.id]) {
    exp[message.author.id] = {
    exp: 0,
    niveau: 1

    };
  }

  let currentExp = exp[message.author.id].exp;
  let currentNiv = exp[message.author.id].niveau;
  let nextLevel = currentNiv * 100;
  exp[message.author.id].exp = currentExp + addExp;

  if(nextLevel <= currentExp) {
    exp[message.author.id].niveau += 1;
    message.reply(`**Bravo, tu est passé niveau ${currentNiv + 1} !**`)
    .then(message => {
      message.delete(5000);
    });
  }




  
    /// Xp Système Fin


// Money systme début


// Money système Fin

    // Lire les commandes

    fs.writeFile('./exp.json', JSON.stringify(exp), err => {
      if (err) console.log(err);
    });
  })

fs.readdir("./events", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });

});

// Lire les Events

client.commands = new Enmap();

fs.readdir("./commandes", (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const props = require(`./commandes/${file}`);
        const commandName = file.split(".")[0];
        console.log(`${commandName} à bien été chargés`)
        client.commands.set(commandName, props);
    });
});

client.login(config.token);
