import React from "react";
import axios from "axios";

import "./App.css";
import MessageForm from "./components/messageForm";
import MessageList from "./components/messageList";

const PORT = 3001;
const URL = `http://localhost:${PORT}`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  submitMessage = (content) => axios.post(`${URL}/message`, { content });

  getAllMessages = () =>
    axios.get(URL).then(({ data }) => this.setState({ messages: data }));

  componentDidMount = () => this.getAllMessages();

  render = () => (
    <div className="App">
      <MessageForm onSubmit={this.submitMessage} />
      <MessageList messages={this.state.messages} />
    </div>
  );
}

export default App;
