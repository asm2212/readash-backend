import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { connectDB } from './config/db.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()
await connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({ message: '🩺 ReaDash API is live!' })
})

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
