const express = require('express')
const http = require('http');
const cors = require('cors')
const session = require('express-session');
const { Server } = require('socket.io');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(session({
  secret:"samsu",
  resave: false,
  saveUninitialized: false,  
}))

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins, for dev. Secure this in production
    methods: ['GET', 'POST']
  }
});

app.get('/', async(req,res)=>{
res.send({message:"Allah Loves Samsu !"})
})

app.get('/login', (req, res) => {
  req.session.userId = '12345'; // Store user data in session
  res.send('Logged in');
});
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    // res.clearCookie('connect.sid'); // Default session cookie name
    res.send('Logged out successfully');
  });
});


app.get('/profile', (req, res) => {
  if (req.session.userId) res.send(`Welcome user ${req.session.userId}`);
   else {
    res.status(401).send('Unauthorized');
  }
});



// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  // Listen for events from client
  socket.on('send_message', (data) => {
    console.log('Received:', data);

    // Broadcast message to all clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen( port, ()=>{
    console.log(`Server is running at ${port}`)
})