import React, { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll()
      .then(notes => {
        setNotes(notes)
      })

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(createdNote => {
        setNotes(notes.concat(createdNote))
        noteFormRef.current.toggleVisibility()
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    noteService
      .update(id, {...note, important: !note.important})
      .then(updatedNote => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note))
        console.log(`importance of ${id} needs to be toggled`)
      })
      .catch(error => {
        setErrorMessage(`the note ${note.content} does not exist in the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      noteService.setToken(user.token)
      setUsername('')
      setPassword('')
      setErrorMessage('Logged!!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('exception: ', exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(null)
    setErrorMessage('Log out!!')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginForm = () => {

    return (
      <Toggable buttonLabel='login'>
          <LoginForm 
            fields={{username: {value: username, setValue: setUsername}, password: {value: password, setValue: setPassword}}}
            handleSubmit={handleLogin}
          />
      </Toggable>
    )
  }

  const noteForm = () => (
    <Toggable buttonLabel={'New Note'} ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Toggable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        (user === null) ?
          loginForm() :
          <div>
            <p>User: {user.name}</p>
            <button onClick={handleLogout}>log out</button>
            {noteForm()}
          </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )
        }
      </ul>

      <Footer />
    </div>
  )
}

export default App