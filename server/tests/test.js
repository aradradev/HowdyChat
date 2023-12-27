const io = require('socket.io-client');
const socket = io('http://localhost:3000');

// Event: Connection
socket.on('connect', () => {
  console.log('Connected to server');

  // Test Authentication
  socket.emit('authenticate', { username: 'testuser' });

  // Test Chat Message
  socket.emit('chat message', { username: 'testuser', content: 'Hello, HowdyChat!' });
});

// Event: User Authenticated
socket.on('userAuthenticated', (username) => {
  console.log(`User authenticated: ${username}`);
});

// Event: Chat Message
socket.on('chat message', (msg) => {
  console.log('Received chat message:', msg);
});

// Event: Disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
