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
  }

  submitMessage = (content) => axios.post(`${URL}/message`, { content });

  render = () => (
    <div className="App">
      <MessageForm onSubmit={this.submitMessage} />
      <MessageList />
    </div>
  );
}

export default App;
