import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection } from './config/database.js'

// Import routes
import adminAuthRoutes from './routes/adminAuthPostgresRoutes.js'
import studentAuthRoutes from './routes/studentAuthRoutes.js'
import facultyAuthRoutes from './routes/facultyAuthRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import facultyPostgresRoutes from './routes/facultyPostgresRoutes.js'
import eventsPostgresRoutes from './routes/eventsPostgresRoutes.js'
import researchPostgresRoutes from './routes/researchPostgresRoutes.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connections
const connectDatabases = async () => {
  // PostgreSQL connection test
  await testConnection()
}

connectDatabases()

// Routes
app.use('/api/admin', adminAuthRoutes)
app.use('/api/student', studentAuthRoutes)
app.use('/api/faculty-auth', facultyAuthRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/faculty', facultyPostgresRoutes)
app.use('/api/events', eventsPostgresRoutes)
app.use('/api/research', researchPostgresRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'PESITM CSE Department API',
    version: '1.0.0',
    status: 'running',
    database: 'PostgreSQL',
    activeEndpoints: {
      admin: '/api/admin',
<<<<<<< HEAD
      faculty: '/api/faculty',
      events: '/api/events',
      research: '/api/research',
      news: '/api/news',
      notifications: '/api/notifications'
=======
      student: '/api/student',
      faculty: '/api/faculty-auth',
      news: '/api/news',
      notifications: '/api/notifications',
      facultyProfiles: '/api/faculty',
      events: '/api/events',
      research: '/api/research'
>>>>>>> e80ac0961509fc5d033b991e09f19eb0417177d6
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
