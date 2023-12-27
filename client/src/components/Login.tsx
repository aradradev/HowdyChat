import React, { useState } from "react";

interface LoginProps{
    onLogin: (username: string) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {

    const [username, setUsername] = useState('')
    const handleLogin = () => {
        if (username.trim() !== '') {
            onLogin(username)
        }
    }
  return (
      <div>
          <h2>Login</h2>
          <input
              type="text"
              placeholder="enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
    </div>
  )
}
export default Login