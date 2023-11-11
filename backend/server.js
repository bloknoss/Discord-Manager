const express = require("express");
const cors = require("cors");

const { executeQuery, insertLog, insertBot } = require("./database");
const { initializeDiscordConnection } = require("./discord");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

app.get("/connected", (req, res) => {});

app.post("/api/form-data", (req, res) => {
    let data = req.body;
    insertBot(
        data["bot_token"],
        data["bot_name"],
        data["bot_avatar"],
        data["bot_prefix"],
        data["bot_status"],
        data["bot_auto"],
        data["bot_run"],
        data["user_id"]
    );
    console.log({ REQUEST: "[POST/FORM]: Form data received, validating..." });

    res.json({ REQUEST: "[POST]: Form data received, validating..." });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//initializeDiscordConnection();