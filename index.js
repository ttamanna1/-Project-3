import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/routes.js'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// It's our variable 
const app = express()


// Middleware
app.use(express.json())

// Logger 
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}` )

  next()
})

// End point 
//! api is not added
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// Start our Server

async function startServer(){
  try {
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('✅ Database connections established')
    app.listen(process.env.PORT, () => console.log(`🦻🏽 Server listening on port ${process.env.PORT}`))
  } catch (error) {
    console.log('🆘 Error establishing connection')
    console.log(error)
  }
}
startServer()
