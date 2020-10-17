import React from "react";

import Message from "./message";

class MessageList extends React.Component {
  constructor() {
    super();
    this.state = {
      editMode: { id: null, content: null },
    };
  }

  render = () => {
    const { messages, onDelete, onUpdate } = this.props;
    return (
      <ul id="message_list">
        {messages ? (
          messages.map((message) => (
            <li className="message" key={message.id}>
              <Message {...message} onDelete={onDelete} onUpdate={onUpdate} />
            </li>
          ))
        ) : (
          <p>No messages</p>
        )}
      </ul>
    );
  };
}

export default MessageList;
