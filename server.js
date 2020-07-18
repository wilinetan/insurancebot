const express = require("express");
const bodyParser = require("body-parser");
var ChatBot = require("./chatbot.js");

let chatbot = new ChatBot();

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  var text = req.body.text;

  try {
    var response = await chatbot.send(text);
    res.send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
