const dialogflow = require("dialogflow");
const uuid = require("uuid");

const dotenv = require("dotenv");
dotenv.config();

// const fs = require("fs");
// console.log("private key", JSON.parse(process.env.PRIVATE_KEY));
// console.log("id", process.env.PROJECT_ID);
// console.log("key", process.env.PRIVATE_KEY);

// Start the chatbot dialogue
// function start() {
//   fs.readFile("service_account.json", (err, content) => {
//     if (err) return console.log("Error loading service account file:", err);
//     const credentials = JSON.parse(content);
//     runSample(credentials);
//   });
// }

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample() {
  // const projectId = credentials.project_id;
  const projectId = process.env.PROJECT_ID;
  // const privateKey = credentials.private_key;
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  // const clientEmail = credentials.client_email;
  const clientEmail = process.env.CLIENT_EMAIL;

  const config = {
    credentials: {
      private_key: privateKey,
      client_email: clientEmail,
    },
  };

  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
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
    const responses = await sessionClient.detectIntent(request);
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

  // const insuranceRequest = {
  //   session: sessionPath,
  //   queryInput: {
  //     text: {
  //       // The query to send to the dialogflow agent
  //       text: "Travel Explorer",
  //       // The language used by the client (en-US)
  //       languageCode: "en-US",
  //     },
  //   },
  // };

  // try {
  //   const responses = await sessionClient.detectIntent(insuranceRequest);
  //   console.log("Detected intent");
  //   const result = responses[0].queryResult;
  //   console.log(`  Query: ${result.queryText}`);
  //   console.log(`  Response: ${result.fulfillmentText}`);
  //   if (result.intent) {
  //     console.log(`  Intent: ${result.intent.displayName}`);
  //   } else {
  //     console.log(`  No intent matched.`);
  //   }
  // } catch (err) {
  //   console.log("err", err);
  // }

  // const insuranceQuestionRequest = {
  //   session: sessionPath,
  //   queryInput: {
  //     text: {
  //       // The query to send to the dialogflow agent
  //       text: "1",
  //       // The language used by the client (en-US)
  //       languageCode: "en-US",
  //     },
  //   },
  // };

  // try {
  //   const responses = await sessionClient.detectIntent(
  //     insuranceQuestionRequest
  //   );
  //   console.log("Detected intent");
  //   const result = responses[0].queryResult;
  //   console.log(`  Query: ${result.queryText}`);
  //   console.log(`  Response: ${result.fulfillmentText}`);
  //   if (result.intent) {
  //     console.log(`  Intent: ${result.intent.displayName}`);
  //   } else {
  //     console.log(`  No intent matched.`);
  //   }
  // } catch (err) {
  //   console.log("err", err);
  // }
}

runSample();
