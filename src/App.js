import React, {useState, useEffect} from 'react'
import './App.css'
import coolpic from './logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import Camera from 'react-snap-pic'
import Div100vh from 'react-div-100vh'
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  useEffect(()=>{
    const pathname = window.location.pathname
    if(pathname.length<2){
      window.location.pathname = Math.random().toString(36).slice(7)
    }
  },[])
  return (<BrowserRouter>
    <Route path="/:page" component={Content} />
  </BrowserRouter>)
} // end App component

export default App;

let db

function initFirebase(){
  firebase.initializeApp({
    apiKey: "AIzaSyDe5hejNin_uspcktTCkhfQAhbWMIARuy0",
    authDomain: "chatterrrrrrr.firebaseapp.com",
    projectId: "chatterrrrrrr",
    storageBucket: "chatterrrrrrr.appspot.com",
  });
  db = firebase.firestore();
}

function Content(props){
  const page = props.match.params.page

  const [messages, setMessages] = useState([])
  const [showCamera, setShowCamera] = useState(false)
  const [name, setName] = useState('')
  const [editName, setEditName] = useState(false)

  function remove(id) {
    setMessages(current=> {
      var msgs = current.filter(m => m.id !== id)
      return msgs
    })
  }

  function receive(m) {
    setMessages(current=> {
      const msgs = [m, ...current]
      msgs.sort((a, b) => b.ts - a.ts)
      return msgs
    })
  }

  function send(m) {
    db.collection("messages").add({
      ...m,
      from: name || 'No name',
      ts: Date.now(),
      page: page,
    })
  }

  function changeEditName(editName) {
    if (!editName) {
      localStorage.setItem('name', name)
    }
    setEditName(editName)
  }

  async function takePicture (img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID + '.jpg');
    await ref.putString(img, 'data_url')
    send({ img: imgID })
  }

  function deleteMessage(m) {
    if (name === m.from || name === 'Evan') {
      db.collection('messages').doc(m.id).delete()
    }
  }
  
  useEffect(()=>{
    var name = localStorage.getItem('name')
    if (name) {
      setName(name)
    }

    initFirebase()
    db.collection("messages").where('page','==',page)
      .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log(change.doc.data())
          receive({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type === 'removed') {
          remove(change.doc.id)
        }
      })
    })
  },[])

  return <Div100vh className="App">
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={coolpic} className="logo" alt="logo" />
        {editName ? '' : 'Chatter'}
        <div className="page-name">{page}</div>
      </div>
      <NamePicker
        name={name}
        editName={editName}
        changeName={name=> setName(name)}
        changeEditName={changeEditName}
      />
    </header>
    <main className="messages">
      {messages.map((m, i) => {
        return (<Message key={i} m={m} name={name}
          onClick={()=> deleteMessage(m)}
        />)
      })}
    </main>
    <TextInput 
      sendMessage={text => send({ text })}
      showCamera={() => setShowCamera(true)}
    />
    {showCamera && <Camera takePicture={takePicture} />}
  </Div100vh>
}

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