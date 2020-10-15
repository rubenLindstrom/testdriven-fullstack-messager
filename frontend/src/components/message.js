import React from "react";

class Message extends React.Component {
  constructor(props) {
    super();
    this.state = {
      editMode: false,
      editModeContent: props.content,
    };
  }

  handleUpdate = () => {
    this.props.onUpdate(this.props.id, this.state.editModeContent);
    this.setState({ editMode: false });
  };

  getButtonProps = () =>
    this.state.editMode
      ? {
          className: "send",
          onClick: () => this.handleUpdate(),
          innerText: "Send Update",
        }
      : {
          className: "update",
          onClick: () => this.setState({ editMode: true }),
          innerText: "update",
        };

  render() {
    const { id, content, date, onDelete } = this.props;
    const buttonProps = this.getButtonProps();
    return (
      <li className="message" key={id}>
        {content}
        <br />
        {new Date(date).toLocaleTimeString("en-UK")}
        <br />
        <button className="delete" onClick={() => onDelete(id)}>
          delete
        </button>
        <button className={buttonProps.className} onClick={buttonProps.onClick}>
          {buttonProps.innerText}
        </button>
        {this.state.editMode && (
          <textarea
            value={this.state.editModeContent}
            onChange={(e) => this.setState({ editModeContent: e.target.value })}
            className="updateBox"
          ></textarea>
        )}
      </li>
    );
  }
}

export default Message;
