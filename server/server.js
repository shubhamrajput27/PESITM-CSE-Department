import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// Import routes
import facultyRoutes from './routes/facultyRoutes.js'
import eventsRoutes from './routes/eventsRoutes.js'
import researchRoutes from './routes/researchRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pesitm-cse', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ MongoDB Connected Successfully')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

connectDB()

// Routes
app.use('/api/faculty', facultyRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/research', researchRoutes)
app.use('/api/contact', contactRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'PESITM CSE Department API',
    version: '1.0.0',
    endpoints: {
      faculty: '/api/faculty',
      events: '/api/events',
      research: '/api/research',
      contact: '/api/contact'
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API URL: http://localhost:${PORT}`)
})

export default app
