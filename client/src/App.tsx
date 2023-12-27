import React, {FunctionComponent, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import ChatWindow from './components/ChatWindow'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
const App: FunctionComponent = () => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {

    socket.on('connect', () => console.log('Connected to server'))
    socket.on('disconnect', () => console.log('Disconnected to server'));

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }

    // socket.connect()

    // socket.on('userAuthenticated', (authenticatedUser: string) => {
    //   setUsername(authenticatedUser)
    // })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  const handleLogin = (user: string) => {
    socket.emit('authenticate', {username: user})
    setUsername(user)
  }
  return (
    <div>
      {
        !username ? (
          <Login onLogin={handleLogin} />
        ) : (
            <ChatWindow username={username} />
        )
      }
    </div>
  )
}

export default App
