const express = require("express");
const mysql = require("mysql");
const util = require("util");
const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");
const app = express();
const port = 3000;
const tokens = ["MTE3MDgyNTEyNjQwNTczNDQyMA.GD3HDp.FjLUcntQdqNg-53b_rfKwjv9JSVYb7yz1yjU6Q"];

const logs = require("./logs.json");

function addLog(message_id, message_content, message_date, user_id, user_name, guild_id, guild_name, channel_id, channel_name) {
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [message_id, message_content, message_date, user_id, user_name, guild_id, guild_name, channel_id, channel_name];
    conn.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Data inserted successfully:", results);
        }
    });
}

function addBot(bot_token, bot_name, bot_avatar, bot_prefix, bot_status, bot_auto, bot_run, user_id) {
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [bot_token, bot_name, bot_avatar, bot_prefix, bot_status, bot_auto,bot_run, user_id];
    conn.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Data inserted successfully:", results);
        }
    });
}

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Discord",
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB successfully.");
});

for (const token of tokens) {
    const client = new Client({
        intents: [
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on("messageCreate", (message) => {
        let message_id = message.id;
        let message_content = message.content;
        let message_date = message.createdTimestamp;
        let user_id = message.author.id;
        let user = message.author.username;
        let guild_id = message.guild.id;
        let guild_name = message.guild.name;
        let channel_id = message.channel.id;
        let channel_name = message.channel.name;
        addLog(message_id, message_content, message_date, user_id, user, guild_id, guild_name, channel_id, channel_name);
    });

    //client.login(token);
}

app.get("/", (req, res) => {
    res.send("Nothing to see here");
});

app.get("/logs", (req, res) => {
    let info = JSON.stringify(logs["messages"], null, 4);
    res.send("<pre>" + info + "</pre>");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

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
    return [rows, fields];
}

async function myFunction() {
    const result = await executeQuery("select * from bots where bot_auto is true");
    for (let token of result[0]) {
        console.log(token["bot_name"]);
    }
}

let x = myFunction();
