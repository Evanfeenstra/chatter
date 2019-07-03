import React from 'react'
import './App.css'
import coolpic from './logo.png'
import TextInput from './TextInput'

class App extends React.Component {

  state={
    messages:['hello','hi'],
  }

  sendMessage = (m) => {
    var messages = [...this.state.messages, m]
    this.setState({messages})
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="App">
        <header className="header">
          <img src={coolpic} className="logo" alt="logo" />
          Chatter
        </header>
        <TextInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
