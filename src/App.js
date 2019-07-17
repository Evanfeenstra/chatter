import React from 'react'
import './App.css'
import coolpic from './logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import Camera from 'react-snap-pic'
import Div100vh from 'react-div-100vh'

class App extends React.Component {

  state = {
    messages: [],
    name: '',
    editName: false,
    showCamera: false,
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name) {
      this.setState({ name })
    }

    /* <=========================> */
    firebase.initializeApp({
      apiKey: "AIzaSyDe5hejNin_uspcktTCkhfQAhbWMIARuy0",
      authDomain: "chatterrrrrrr.firebaseapp.com",
      projectId: "chatterrrrrrr",
      storageBucket: "chatterrrrrrr.appspot.com",
    });

    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type === 'removed') {
          this.remove(change.doc.id)
        }
      })
    })
  } // end componentWillMount

  remove = (id) => {
    var msgs = [...this.state.messages]
    var messages = msgs.filter(m => m.id !== id)
    this.setState({ messages })
  }

  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a, b) => b.ts - a.ts)
    this.setState({ messages })
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }
  /* <===========================> */

  setEditName = (editName) => {
    if (!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({ editName })
  }

  takePicture = async (img) => {
    this.setState({ showCamera: false })
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID + '.jpg');
    await ref.putString(img, 'data_url')
    this.send({ img: imgID })
  }

  render() {
    var { editName, messages, name, showCamera } = this.state
    return (
      <Div100vh className="App">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={coolpic} className="logo" alt="logo" />
            {editName ? '' : 'Chatter'}
          </div>
          <NamePicker
            name={name}
            editName={editName}
            changeName={name => this.setState({ name })}
            setEditName={this.setEditName}
          />
        </header>
        <main className="messages">
          {messages.map((m, i) => {
            return (<Message key={i} m={m} name={name}
              onClick={() => {
                if (name === m.from || name === 'Evan') {
                  this.db.collection('messages').doc(m.id).delete()
                }
              }}
            />)
          })}
        </main>
        <TextInput sendMessage={text => this.send({ text })}
          showCamera={() => this.setState({ showCamera: true })}
        />
        {showCamera && <Camera takePicture={this.takePicture} />}
      </Div100vh>
    )
  } // end render()

} // end App component

export default App;

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatterrrrrrr.appspot.com/o/'
const suffix = '.jpg?alt=media'
function Message(props) {
  var { m, name, onClick } = props
  return (<div className="bubble-wrap"
    from={m.from === name ? "me" : "you"}
    onClick={onClick}
  >
    {m.from !== name && <div className="bubble-name">{m.from}</div>}
    <div className="bubble">
      <span>{m.text}</span>
      {m.img && <img alt="pic" src={bucket + m.img + suffix} />}
    </div>
  </div>)
}






class Counter extends React.Component {

  state = { count: 0 }

  componentDidMount() {
    var countString = localStorage.getItem('count')
    this.setState({ count: parseInt(countString) })
  }

  setTheCount = (count) => {
    localStorage.setItem('count', count)
    this.setState({ count })
  }

  render() {
    const { count } = this.state
    return (<div>
      <ShowCount count={count} color="black"
        howMuchToChangeBy={1}
        setCount={this.setTheCount}
      />
      <ShowCount count={0 - count}
        color={0 - count > 0 ? "blue" : "red"}
        howMuchToChangeBy={-1}
        setCount={this.setTheCount}
      />
    </div>)
  }
}

function ShowCount(props) {
  console.log(props.count)
  const { count, setCount, color, howMuchToChangeBy } = props
  return (<div style={{ fontSize: 200, color }}
    onClick={() => setCount(count + howMuchToChangeBy)}>
    {count}
  </div>)
}


//export default Counter



class Test extends React.Component {
  render() {
    return <div className="test">

    </div>
  }
}

// export default Test