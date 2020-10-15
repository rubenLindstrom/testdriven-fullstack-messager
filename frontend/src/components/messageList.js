import React from "react";

class MessageList extends React.Component {
  constructor() {
    super();
    this.state = {
      editMode: { id: null, content: null },
    };
  }

  toggleUpdate = (message) => this.setState({ editMode: { ...message } });

  // TODO: Move single message into it's own component

  getButtonProps = (id, content) =>
    id === this.state.editMode.id
      ? {
          className: "send",
          onClick: () => this.toggleUpdate({ id, content }),
          innerText: "Send Update",
        }
      : {
          className: "update",
          onClick: () => this.toggleUpdate({ id, content }),
          innerText: "update",
        };

  render = () => {
    const { messages, onDelete, onUpdate } = this.props;
    return (
      <ul id="message_list">
        {messages ? (
          messages.map(({ id, content, date }) => {
            const buttonProps = this.getButtonProps(id, content);
            return (
              <li className="message" key={id}>
                {content}
                <br />
                {new Date(date).toLocaleTimeString("en-UK")}
                <br />
                <button className="delete" onClick={() => onDelete(id)}>
                  delete
                </button>
                <button
                  className={buttonProps.className}
                  onClick={buttonProps.onClick}
                >
                  {buttonProps.innerText}
                </button>
              </li>
            );
          })
        ) : (
          <p>No messages</p>
        )}
      </ul>
    );
  };
}

export default MessageList;
