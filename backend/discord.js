const { executeQuery, insertLog } = require("./database");
const { Client, GatewayIntentBits } = require("discord.js");
const intents = [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
];

async function initializeDiscordConnection() {
    const tokens = executeQuery("select bot_token from bots where bot_run is false order by LENGTH('bot_prefix')");

    (async () => {
        await tokens.then(async (results) => {
            let stringJSON = JSON.stringify(results[0]);
            let pureJSON = JSON.parse(stringJSON);
            let mapped = new Map(Object.entries(pureJSON));

            mapped.forEach((value, key) => {
                const token = value;

                const bot_info = executeQuery(`select * from bots where bot_token = "${token}"`);
                const client = new Client({ intents: intents });

                client.on("ready", () => {
                    console.log(`Logged in as ${client.user.tag}!`);
                });

                client.on("messageCreate", async (message) => {
                    bot_info.then((data) => {
                        let stringJSON = JSON.stringify(data[0]);
                        let pureJSON = JSON.parse(stringJSON);
                        let prefix = pureJSON["bot_prefix"];
                        let messageData = getMessageData(message);

                        insertLog(
                            messageData["message_id"],
                            messageData["message_content"],
                            messageData["message_date"],
                            messageData["user_id"],
                            messageData["user"],
                            messageData["guild_id"],
                            messageData["guild_name"],
                            messageData["channel_id"],
                            messageData["channel_name"]
                        );
                        if (messageData["message_content"].startsWith(prefix)) {
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
function getMessageData(message) {
    let data = {
        message_id: message.id,
        message_content: message.content,
        message_date: message.createdTimestamp,
        user_id: message.author.id,
        user: message.author.username,
        guild_id: message.guild.id,
        guild_name: message.guild.name,
        channel_id: message.channel.id,
        channel_name: message.channel.name,
    };

    return data;
}
module.exports = {
    initializeDiscordConnection,
};
