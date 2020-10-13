import React from 'react';
import './App.css';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';

const App = () => (
    <div className="App">
      <MessageForm />
      <MessageList />
    </div>
  );

export default App;
