import pool from '../config/database.js'
import bcrypt from 'bcrypt'

class AdminUser {
  // Create a new admin user
  static async create(userData) {
    const {
      username,
      email,
      password,
      fullName,
      role = 'admin',
      createdBy = null
    } = userData

    try {
      // Hash password
      const saltRounds = 12
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const query = `
        INSERT INTO admin_users (username, email, password_hash, full_name, role, created_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, username, email, full_name, role, is_active, created_at
      `
      
      const values = [username, email, passwordHash, fullName, role, createdBy]
      const result = await pool.query(query, values)
      
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating admin user: ${error.message}`)
    }
  }

  // Find user by username or email
  static async findByUsernameOrEmail(identifier) {
    try {
      const query = `
        SELECT * FROM admin_users 
        WHERE (username = $1 OR email = $1) AND is_active = TRUE
      `
      
      const result = await pool.query(query, [identifier])
      return result.rows[0] || null
    } catch (error) {
      throw new Error(`Error finding admin user: ${error.message}`)
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const query = `
        SELECT id, username, email, full_name, role, is_active, 
               last_login_at, failed_login_attempts, locked_until, 
               created_at, updated_at
        FROM admin_users 
        WHERE id = $1 AND is_active = TRUE
      `
      
      const result = await pool.query(query, [id])
      return result.rows[0] || null
    } catch (error) {
      throw new Error(`Error finding admin user by ID: ${error.message}`)
    }
  }

  // Verify password
  static async comparePassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword)
    } catch (error) {
      throw new Error(`Error comparing password: ${error.message}`)
    }
  }

  // Check if account is locked
  static isAccountLocked(user) {
    return user.locked_until && new Date(user.locked_until) > new Date()
  }

  // Update last login
  static async updateLastLogin(userId) {
    try {
      const query = `
        UPDATE admin_users 
        SET last_login_at = CURRENT_TIMESTAMP, 
            failed_login_attempts = 0,
            locked_until = NULL
        WHERE id = $1
      `
      
      await pool.query(query, [userId])
    } catch (error) {
      throw new Error(`Error updating last login: ${error.message}`)
    }
  }

  // Increment failed login attempts
  static async incrementLoginAttempts(userId) {
    try {
      const MAX_LOGIN_ATTEMPTS = 5
      const LOCK_TIME_MINUTES = 30

      const query = `
        UPDATE admin_users 
        SET failed_login_attempts = failed_login_attempts + 1,
            locked_until = CASE 
              WHEN failed_login_attempts + 1 >= $2 
              THEN CURRENT_TIMESTAMP + INTERVAL '${LOCK_TIME_MINUTES} minutes'
              ELSE locked_until
            END
        WHERE id = $1
      `
      
      await pool.query(query, [userId, MAX_LOGIN_ATTEMPTS])
    } catch (error) {
      throw new Error(`Error incrementing login attempts: ${error.message}`)
    }
  }

  // Change password
  static async changePassword(userId, newPassword) {
    try {
      const saltRounds = 12
      const passwordHash = await bcrypt.hash(newPassword, saltRounds)

      const query = `
        UPDATE admin_users 
        SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `
      
      await pool.query(query, [passwordHash, userId])
    } catch (error) {
      throw new Error(`Error changing password: ${error.message}`)
    }
  }

  // Get all admin users
  static async getAll() {
    try {
      const query = `
        SELECT id, username, email, full_name, role, is_active, 
               last_login_at, created_at, updated_at
        FROM admin_users 
        ORDER BY created_at DESC
      `
      
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error(`Error getting all admin users: ${error.message}`)
    }
  }

  // Deactivate user
  static async deactivate(userId) {
    try {
      const query = `
        UPDATE admin_users 
        SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
      `
      
      await pool.query(query, [userId])
    } catch (error) {
      throw new Error(`Error deactivating admin user: ${error.message}`)
    }
  }

  // Log admin activity
  static async logActivity(adminId, action, resource = null, resourceId = null, details = null, ipAddress = null, userAgent = null) {
    try {
      const query = `
        INSERT INTO admin_activity_log (admin_id, action, resource, resource_id, details, ip_address, user_agent)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `
      
      const values = [adminId, action, resource, resourceId, JSON.stringify(details), ipAddress, userAgent]
      await pool.query(query, values)
    } catch (error) {
      console.error('Error logging admin activity:', error.message)
      // Don't throw error for logging failures
    }
  }
}

export default AdminUser