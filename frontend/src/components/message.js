import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

class MessageContainer extends React.Component {
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
    return (
      <Message
        {...this.props}
        {...this.state}
        buttonProps={this.getButtonProps()}
        onDelete={() => this.props.onDelete(this.props.id)}
        date={new Date(this.props.date).toLocaleTimeString("en-UK")}
        onEditModeContentChange={(e) =>
          this.setState({ editModeContent: e.target.value })
        }
      />
    );
  }
}

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    padding: 12,
    margin: "auto",
    marginBottom: 12,
    backgroundColor: "#f1f1f1",
    border: "1px solid lightgrey",
  },
  button: {
    margin: "6px 4px 0 4px",
  },
});

const Message = ({
  content,
  date,
  onDelete,
  editMode,
  editModeContent,
  onEditModeContentChange,
  buttonProps,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      {editMode ? (
        <TextField
          value={editModeContent}
          onChange={onEditModeContentChange}
          inputProps={{ style: { textAlign: "center" } }}
          className="updateBox"
        />
      ) : (
        <Typography>{content}</Typography>
      )}
      <Typography color="textSecondary" gutterBottom>
        {date}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        className={`${buttonProps.className} ${classes.button}`}
        onClick={buttonProps.onClick}
      >
        {buttonProps.innerText}
      </Button>
      <Button
        color="secondary"
        className={`delete ${classes.button}`}
        onClick={onDelete}
      >
        delete
      </Button>
    </Card>
  );
};

export default MessageContainer;
