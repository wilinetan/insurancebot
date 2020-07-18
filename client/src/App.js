import React from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.user = { id: 1 };
    this.bot = { id: 0 };
    this.state = {
      messages: [],
    };
  }

  addNewMessage = async (event) => {
    let botResponce = Object.assign({}, event.message);

    this.setState((prevState) => ({
      messages: [...prevState.messages, event.message],
    }));

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: event.message.text }),
    });

    const body = await response.text();
    botResponce.text = body;
    botResponce.author = this.bot;

    this.setState((prevState) => ({
      messages: [...prevState.messages, botResponce],
    }));
  };

  render() {
    return (
      <div>
        <Chat
          user={this.user}
          messages={this.state.messages}
          onMessageSend={this.addNewMessage}
          placeholder={"Type a message..."}
          width={400}
        ></Chat>
      </div>
    );
  }
}

export default App;
