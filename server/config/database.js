import pkg from 'pg'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Pool } = pkg

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from the server directory
dotenv.config({ path: join(__dirname, '..', '.env') })

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'pesitm_cse_portal',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
}

// Create connection pool
const pool = new Pool(dbConfig)

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect()
    console.log('✅ PostgreSQL connected successfully')
    
    // Test query
    const result = await client.query('SELECT NOW()')
    console.log('🕐 Database time:', result.rows[0].now)
    
    client.release()
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error.message)
  }
}

export { pool, testConnection }
export default pool