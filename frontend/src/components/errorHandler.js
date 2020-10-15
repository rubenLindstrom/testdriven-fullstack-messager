import React from "react";

const errorHandler = ({ error }) => (
  <div id="error">{error?.data && `Error: ${error.data}`}</div>
);

export default errorHandler;
