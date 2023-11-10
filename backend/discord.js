const { Client, GatewayIntentBits } = require("discord.js");
const intents = [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
];

const tokens = executeQuery("select bot_token from bots where bot_run is false");

async function initializeDiscordConnection() {
    (async () => {
        await tokens.then(async (results) => {
            let stringJSON = JSON.stringify(results[0]);
            let pureJSON = JSON.parse(stringJSON);
            let mapped = new Map(Object.entries(pureJSON));

            mapped.forEach((value, key) => {
                let token = value;
                const bot_info = executeQuery(`select * from bots where bot_token = "${token}"`);
                const client = new Client({
                    intents: intents,
                });

                client.on("ready", () => {
                    console.log(`Logged in as ${client.user.tag}!`);
                });

                client.on("messageCreate", async (message) => {
                    bot_info.then((data) => {
                        let stringJSON = JSON.stringify(data[0]);
                        let pureJSON = JSON.parse(stringJSON);
                        let prefix = pureJSON["bot_prefix"];
                        console.log(prefix);
                        let message_id = message.id;
                        let message_content = message.content;
                        let message_date = message.createdTimestamp;
                        let user_id = message.author.id;
                        let user = message.author.username;
                        let guild_id = message.guild.id;
                        let guild_name = message.guild.name;
                        let channel_id = message.channel.id;
                        let channel_name = message.channel.name;
                        insertLog(message_id, message_content, message_date, user_id, user, guild_id, guild_name, channel_id, channel_name);

                        if (message_content.startsWith(prefix)) {
                            message.delete();
                            message.channel.send(message_content.replace(prefix, ""));
                        }
                    });
                });

                client.login(token);
            });
        });
    })();
}
