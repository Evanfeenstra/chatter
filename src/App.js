import React from 'react'
import './App.css'
import coolpic from './logo.png'
import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={coolpic} className="logo" alt="logo" />
        Chatter
      </header>
      <TextInput />
    </div>
  );
}

export default App;
