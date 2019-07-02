import React from 'react'
import {FiEdit} from 'react-icons/fi'

function NamePicker({ name, editName, changeName, setEditName }) {
  return editName ? <div className="edit-username">
    <input value={name} className="name-input"
      onChange={e => changeName(e.target.value)}
    />
    <button className="name-button"
      onClick={() => setEditName(false)}>
      OK
      </button>
  </div> : <div className="username">
      {name || "Set Username:"}
      <FiEdit style={{ marginLeft: 10, cursor: 'pointer' }}
        onClick={() => setEditName(true)}
      />
    </div>
}

export default NamePicker