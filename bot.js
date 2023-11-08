import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async message =>{
    console.log()
});

client.on('messageCreate', async message => {
  console.log(message.content);
});

client.login(token);