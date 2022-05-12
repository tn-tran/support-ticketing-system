const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB  = require('./config/db')
const PORT = process.env.PORT || 7000

// Connect to databse
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production') { 
  // Set build folder
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else { 
  app.get('/', (req, res) => { 
    res.status(200).json({message: 'Wellcome to the Support Desk API'})
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`server start at ${PORT}`))


