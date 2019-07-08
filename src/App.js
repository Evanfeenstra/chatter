import React from 'react'
import './App.css'
import coolpic from './logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'

class App extends React.Component {

  state = {
    messages:[],
    name:'',
    editName:false,
  }

  gotMessage = (text) => {
    var message = {
      text,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages]
    this.setState({messages: newMessagesArray})
  }

  render() {
    var {editName, messages, name} = this.state
    return (
      <div className="App">
        <header className="header">
          <div>
            <img src={coolpic} className="logo" alt="logo" />
            Chatter
          </div>
          <NamePicker 
            name={name}
            editName={editName}
            changeName={name=> this.setState({name})}
            setEditName={()=> this.setState({editName: !editName})}
          />
        </header>
        <main className="messages">
          {messages.map((m,i)=>{
            return (<div key={i} className="bubble-wrap" 
                from={m.from===name ? "me" : "you"}
              >
              {m.from!==name && <div className="bubble-name">{m.from}</div>}
              <div className="bubble">
                <span>{m.text}</span>
              </div>
            </div>)
          })}
        </main>
        <TextInput sendMessage={this.gotMessage} />
      </div>
    )
  }
}

export default App;
