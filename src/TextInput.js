import React from 'react'
import { FiSend } from "react-icons/fi";

class TextInput extends React.Component {

  state={
    text:'Type here...',
  }

  send = () => {
    alert(this.state.text)
    this.setState({text: ''})
  }

  render(){
    return(<div className="text-input">
      <input value={this.state.text} 
        onChange={e=> this.setState({text: e.target.value})}
      />
      <button onClick={this.send} disabled={!this.state.text}>
        <FiSend />
      </button>
    </div>)
  }

}

export default TextInput


