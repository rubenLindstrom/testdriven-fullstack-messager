import React from "react";
import axios from "axios";

import "./App.css";
import MessageForm from "./components/messageForm";
import MessageList from "./components/messageList";
import ErrorHandler from "./components/errorHandler";

const PORT = 3001;
const URL = `http://localhost:${PORT}`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount = () => this.getAllMessages();

  setError = (error) => this.setState({ error });
  setMessages = (messages) => this.setState({ messages });

  submitMessage = (content) =>
    axios
      .post(`${URL}/message`, { content })
      .then(this.getAllMessages)
      .catch((err) => this.setError(err));

  getAllMessages = () =>
    axios
      .get(URL)
      .then(({ data }) => this.setMessages(data))
      .catch((err) => this.setError(err));

  deleteMessage = (id) =>
    axios
      .delete(`${URL}/delete/${id}`, { id })
      .then(this.getAllMessages)
      .catch((err) => this.setError(err));

  sendUpdate = (id, content) =>
    axios
      .put(`${URL}/update/${id}`, { content })
      .then(this.getAllMessages)
      .catch((err) => this.setError(err));

  render = () => (
    <div className="App">
      <ErrorHandler error={this.state.error} />
      <MessageForm onSubmit={this.submitMessage} />
      <MessageList
        messages={this.state.messages}
        onDelete={this.deleteMessage}
        onUpdate={this.sendUpdate}
      />
    </div>
  );
}

export default App;
