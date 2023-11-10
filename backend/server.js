const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { executeQuery } = require("./database");
const { initializeDiscordConnection } = require("./discord");

const app = express();
const port = 3001;

var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser

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
    console.log("Datos recibidos:", req.body);
    // Aquí puedes procesar los datos como desees
    res.json({ mensaje: "Datos recibidos con éxito" });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${port}`);
});

initializeDiscordConnection();
