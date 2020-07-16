const dialogflow = require("dialogflow");
const uuid = require("uuid");

const dotenv = require("dotenv");
dotenv.config();

class ChatBot {
  constructor() {
    this.projectId = process.env.PROJECT_ID;
    this.privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
    this.clientEmail = process.env.CLIENT_EMAIL;
    this.config = {
      credentials: {
        private_key: this.privateKey,
        client_email: this.clientEmail,
      },
    };
    this.sessionId = uuid.v4();
    this.sessionClient = new dialogflow.SessionsClient(this.config);
    this.sessionPath = this.sessionClient.sessionPath(
      this.projectId,
      this.sessionId
    );
  }

  async send(text) {
    // The text query request.
    const request = {
      session: this.sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    const responses = await this.sessionClient.detectIntent(request);
    // console.log("Detected intent");
    const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      //   console.log(`  Intent: ${result.intent.displayName}`);
      return result.fulfillmentText;
    } else {
      //   console.log(`  No intent matched.`);
      return "No intent matched";
    }
  }

  async run() {
    // The text query request.
    const request = {
      session: this.sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: "hello",
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    try {
      const responses = await this.sessionClient.detectIntent(request);
      console.log("Detected intent");
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    } catch (err) {
      console.log("err", err);
    }
  }
}

module.exports = ChatBot;
