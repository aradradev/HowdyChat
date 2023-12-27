import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"


interface ChatWindowProps {
  username: string
}

const socket = io('http://localhost:3000')

const ChatWindow: React.FC<ChatWindowProps> = ({ username }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setMessages(prevMessages => [...prevMessages, msg])
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setLoading(true)
      socket.emit('chat message', `${username}: ${message}`)
      setTimeout(() => {
        setMessage('')
        setLoading(false)
      }, 1000)
    }
  }
  return (
    <div>
      <h2>Welcome to HowdyChat, {username}👋 !</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{ msg }</div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  )
}
export default ChatWindow