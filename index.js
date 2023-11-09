const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const port = 3000;

const tokens = executeQuery("select bot_token from bots where bot_run is false");

const intents = [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
];

async function executeQuery(query) {
    const mysql = require("mysql2/promise");
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "Discord",
    });
    let [rows, fields] = await conn.execute(query);
    conn.end();
    return rows;
}

function insertLog(message_id, message_content, message_date, user_id, user_name, guild_id, guild_name, channel_id, channel_name) {
    const sql = `
    INSERT INTO logs (
      message_id,
      message_content,
      message_date,
      user_id,
      user_name,
      guild_id,
      guild_name,
      channel_id,
      channel_name
    ) VALUES ("${message_id}", "${message_content}", ${message_date}, "${user_id}", "${user_name}", "${guild_id}", "${guild_name}", "${channel_id}", "${channel_name}")
  `;

    executeQuery(sql);
}

function insertBot(bot_token, bot_name, bot_avatar, bot_prefix, bot_status, bot_auto, bot_run, user_id) {
    const sql = `
    INSERT INTO bots (
      bot_token,
      bot_name,
      bot_avatar,
      bot_prefix,
      bot_status,
      bot_auto,
      bot_run,
      user_id
    ) VALUES (${bot_token}, ${bot_name}, ${bot_avatar}, ${bot_prefix}, ${bot_status}, ${bot_auto}, ${bot_run}, ${user_id})
  `;

    const values = [bot_token, bot_name, bot_avatar, bot_prefix, bot_status, bot_auto, bot_run, user_id];
    conn.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Data inserted successfully:", results);
        }
    });
}

async function startBots() {
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
                        let prefix = data[0]["bot_prexix"];
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
                            console.log("test");
                        }
                    });
                });

                client.login(token);
            });
        });
    })();
}

app.get("/", (req, res) => {
    res.send("Nothing to see here");
});

app.get("/logs", (req, res) => {
    let info = executeQuery("select * from logs");
    (async () => {
        let messages = [];
        await info.then(async (results) => {
            let stringJSON = JSON.stringify(results, null, 4);

            messages.push(stringJSON);
        });
        res.send("<pre>" + messages + "</pre>");
    })();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

let printTokens = async () => {
    await getTokens.then(async (results) => {
        let stringJSON = JSON.stringify(results[0]);
        let pureJSON = JSON.parse(stringJSON);
        let mapped = new Map(Object.entries(pureJSON));

        mapped.forEach((value, key) => {
            console.log(value);
        });
    });
};

startBots();
