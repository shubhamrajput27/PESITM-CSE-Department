import AdminUser from '../models/AdminUserPostgres.js'
import pool from '../config/database.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize PostgreSQL database with schema and default data
const initializeDatabase = async () => {
  try {
    console.log('🌱 Starting PostgreSQL Database Initialization...')

    // Read and execute schema SQL file
    const schemaPath = path.join(__dirname, '../database/postgresql_schema.sql')
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    
    // Split SQL commands by semicolon and execute them
    const commands = schemaSQL.split(';').filter(cmd => cmd.trim().length > 0)
    
    for (const command of commands) {
      if (command.trim()) {
        try {
          await pool.query(command)
        } catch (error) {
          // Skip errors for commands that might already exist
          if (!error.message.includes('already exists')) {
            console.warn('SQL Warning:', error.message)
          }
        }
      }
    }

    console.log('✅ Database schema created successfully')

    // Create default admin users with hashed passwords
    const defaultAdmins = [
      {
        username: 'admin',
        email: 'admin@pesitm.edu.in',
        password: 'admin123',
        fullName: 'System Administrator',
        role: 'super_admin'
      },
      {
        username: 'hod',
        email: 'hod.cse@pesitm.edu.in',
        password: 'hod123',
        fullName: 'Dr. Prasanna Kumar H R (HOD)',
        role: 'admin'
      },
      {
        username: 'faculty',
        email: 'faculty@pesitm.edu.in',
        password: 'faculty123',
        fullName: 'Prof. Priya Sharma',
        role: 'moderator'
      },
      {
        username: 'coordinator',
        email: 'coordinator@pesitm.edu.in',
        password: 'coord123',
        fullName: 'Dr. Amit Verma (Coordinator)',
        role: 'admin'
      },
      {
        username: 'assistant',
        email: 'assistant@pesitm.edu.in',
        password: 'assist123',
        fullName: 'Ms. Kavya Reddy (Assistant)',
        role: 'moderator'
      }
    ]

    // Create admin users
    for (const adminData of defaultAdmins) {
      try {
        // Check if user already exists
        const existingUser = await AdminUser.findByUsernameOrEmail(adminData.username)
        
        if (!existingUser) {
          await AdminUser.create(adminData)
          console.log(`✅ Created admin user: ${adminData.username}`)
        } else {
          console.log(`🟡 Admin user already exists: ${adminData.username}`)
        }
      } catch (error) {
        console.error(`❌ Error creating admin user ${adminData.username}:`, error.message)
      }
    }

    // Display all admin users
    const allAdmins = await AdminUser.getAll()
    console.log('\n📋 Current Admin Users:')
    console.table(allAdmins.map(admin => ({
      ID: admin.id,
      Username: admin.username,
      Email: admin.email,
      'Full Name': admin.full_name,
      Role: admin.role,
      Active: admin.is_active,
      'Last Login': admin.last_login_at || 'Never'
    })))

    console.log('\n🎉 PostgreSQL Database Initialization Completed!')
    console.log('\n🔐 Admin Login Credentials:')
    defaultAdmins.forEach(admin => {
      console.log(`   ${admin.username} / ${admin.password} (${admin.role})`)
    })

  } catch (error) {
    console.error('❌ Database Initialization Error:', error.message)
    throw error
  }
}

// Run initialization
const runInit = async () => {
  try {
    await initializeDatabase()
    process.exit(0)
  } catch (error) {
    console.error('❌ Initialization failed:', error.message)
    process.exit(1)
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Promise Rejection:', error)
  process.exit(1)
})

// Run the initialization
runInit()