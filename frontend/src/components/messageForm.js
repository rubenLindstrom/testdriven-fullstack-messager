import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

class MessageFormContainer extends React.Component {
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
    <MessageForm
      onSubmit={this.handleSubmit}
      currentMessage={this.state.currentMessage}
      onMessageChange={this.handleMessageValueChange}
    />
  );
}

const useStyles = makeStyles({
  form: {
    maxWidth: 300,
    margin: "auto",
  },
  textField: {
    marginBottom: 4,
  },
});

const MessageForm = ({ onSubmit, currentMessage, onMessageChange }) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        className={classes.textField}
        value={currentMessage}
        onChange={onMessageChange}
        multiline
        variant="outlined"
        id="message_box"
        rows={2}
        fullWidth
        label="Message"
      />
      <br />
      <Button
        fullWidth
        variant="outlined"
        type="submit"
        name="submit"
        id="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default MessageFormContainer;
