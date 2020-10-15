import React from "react";

const messageList = ({ messages }) => (
  <ul id="message_list">
    {messages ? (
      messages.map(({ id, content, date }) => (
        <li className="message" key={id}>
          {content}
          <br />
          {date}
        </li>
      ))
    ) : (
      <p>No messages</p>
    )}
  </ul>
);

export default messageList;
