const express = require("express");
const bodyParser = require("body-parser");
var ChatBot = require("./chatbot.js");

let chatbot = new ChatBot();

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/test", async (req, res) => {
  var text = req.body.text;

  try {
    res.json(await chatbot.send(text));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
