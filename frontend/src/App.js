import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <textarea id="message_box"></textarea>
      <br />
      <button
        type="submit"
        name="submit"
        id="submit"
      >
        Submit
      </button>
      <ul id="message_list"></ul>
    </div>
  );
}

export default App;
