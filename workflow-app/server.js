// Imports
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const User = require('./models/user')

const app = express()
mongoose.set('strictQuery', true)

const { MONGODB_URI, SESSION_SECRET, CLIENT_URL = 'http://localhost:3000', SERVER_PORT = 4000 } = process.env
if (!MONGODB_URI || !SESSION_SECRET) {
  console.error('Missing MONGODB_URI or SESSION_SECRET — copy .env.example to .env and fill it in.')
  process.exit(1)
}

// Database
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' },
}))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

// Routes
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(401).json({ message: 'Invalid username or password' })
    req.logIn(user, (err) => {
      if (err) return next(err)
      res.json({ username: user.username })
    })
  })(req, res, next)
})

app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }
    if (await User.findOne({ username })) {
      return res.status(409).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await new User({ username, password: hashedPassword }).save()
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    next(err)
  }
})

app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.json({ message: 'Logged out' })
  })
})

// Returns the logged-in user, or 401 if not logged in
app.get('/user', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not logged in' })
  res.json(req.user)
})

// Error handler — stops the server crashing on a thrown error
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error' })
})

// Server
app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}`))
