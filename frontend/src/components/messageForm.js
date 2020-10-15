import React from "react";

class MessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currentMessage: "",
    };
  }

  handleMessageValueChange = (e) => {
    this.setState({ currentMessage: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.currentMessage);
    this.setState({ currentMessage: "" });
  };

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <textarea
        value={this.state.currentMessage}
        onChange={this.handleMessageValueChange}
        name=""
        id="message_box"
      ></textarea>
      <br />
      <button type="submit" name="submit" id="submit">
        Submit
      </button>
    </form>
  );
}

export default MessageForm;
