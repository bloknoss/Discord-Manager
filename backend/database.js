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

module.exports = {
    executeQuery,
    insertBot,
    insertLog
}