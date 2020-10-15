import React from "react";

const messageList = ({ messages, onDelete }) => (
  <ul id="message_list">
    {messages ? (
      messages.map(({ id, content, date }) => (
        <li className="message" key={id}>
          {content}
          <br />
          {date}
          <br />
          <button className="delete" onClick={() => onDelete(id)}>
            delete
          </button>
        </li>
      ))
    ) : (
      <p>No messages</p>
    )}
  </ul>
);

export default messageList;
