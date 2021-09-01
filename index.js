const { Client, Intents } = require("discord.js");
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); // These 2 intents are REQUIRED for this example to function.

client.login("TOKEN"); // Enter your token here.

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("messageCreate", (message) => {
  if (message.channel.name == "chatbot")  { // The bot will only look for messages with the channel named "chatbot"
    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.reply({ content: "**:x: Please dont mention anyone**", allowedMentions: { repliedUser: true }});
    }
    message.channel.sendTyping();
    if (!message.content) return message.reply({ content: "Please say something.", allowedMentions: { repliedUser: true }});
    scb.chat({message: message.content, name: client.user.username, owner:"CoolOwnerName", user: message.author.id, language:"en"}).then(reply => { 
    message.reply({ content: reply, allowedMentions: { repliedUser: true }});
    })
    message.channel.sendTyping();
  }
});
