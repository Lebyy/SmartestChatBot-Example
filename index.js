const Discord = require('discord.js');
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
const client = new Discord.Client();
client.login("TOKEN");
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});
client.on("message", async message => {
  if (message.channel.name == "chatbot") {
    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.channel.send(`**:x: Please dont mention anyone**`);
    }
    message.channel.startTyping();
    if (!message.content) return message.channel.send("Please say something.");
    scb.chat({message: message.content, name: client.user.username, owner:"CoolOwnerName", user: message.author.id, language:"en"}).then(reply => {
    message.channel.send(`> ${message.content} \n <@${message.author.id}> ${reply}`);
    })
    message.channel.stopTyping();
  }
});
