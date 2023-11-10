const express = require("express");
const {executeQuery} = require("./database.js")

const app = express();
const port = 3000;



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