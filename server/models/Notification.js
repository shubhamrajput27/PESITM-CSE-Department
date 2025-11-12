import pool from '../config/database.js'

class Notification {
  // Create a new notification
  static async create(notificationData) {
    const {
      title,
      message,
      type = 'info',
      priority = 'normal',
      is_active = true,
      show_banner = false,
      expires_at,
      author_id
    } = notificationData

    try {
      const query = `
        INSERT INTO notifications (title, message, type, priority, is_active, show_banner, expires_at, author_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `
      
      const values = [title, message, type, priority, is_active, show_banner, expires_at, author_id]
      const result = await pool.query(query, values)
      
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error creating notification: ${error.message}`)
    }
  }

  // Get all active notifications
  static async getAll(includeExpired = false) {
    try {
      let query = `
        SELECT n.*, au.full_name as author_name
        FROM notifications n
        LEFT JOIN admin_users au ON n.author_id = au.id
        WHERE n.is_active = TRUE
      `
      
      if (!includeExpired) {
        query += ` AND (n.expires_at IS NULL OR n.expires_at > CURRENT_TIMESTAMP)`
      }
      
      query += ` ORDER BY n.priority DESC, n.created_at DESC`
      
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error(`Error getting notifications: ${error.message}`)
    }
  }

  // Get banner notifications
  static async getBannerNotifications() {
    try {
      const query = `
        SELECT n.*, au.full_name as author_name
        FROM notifications n
        LEFT JOIN admin_users au ON n.author_id = au.id
        WHERE n.is_active = TRUE 
        AND n.show_banner = TRUE
        AND (n.expires_at IS NULL OR n.expires_at > CURRENT_TIMESTAMP)
        ORDER BY n.display_order ASC, n.priority DESC, n.created_at DESC
      `
      
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error(`Error getting banner notifications: ${error.message}`)
    }
  }

  // Get notification by ID
  static async getById(id) {
    try {
      const query = `
        SELECT n.*, au.full_name as author_name
        FROM notifications n
        LEFT JOIN admin_users au ON n.author_id = au.id
        WHERE n.id = $1
      `
      
      const result = await pool.query(query, [id])
      return result.rows[0] || null
    } catch (error) {
      throw new Error(`Error getting notification by ID: ${error.message}`)
    }
  }

  // Get notifications by type
  static async getByType(type) {
    try {
      const query = `
        SELECT n.*, au.full_name as author_name
        FROM notifications n
        LEFT JOIN admin_users au ON n.author_id = au.id
        WHERE n.is_active = TRUE 
        AND n.type = $1
        AND (n.expires_at IS NULL OR n.expires_at > CURRENT_TIMESTAMP)
        ORDER BY n.priority DESC, n.created_at DESC
      `
      
      const result = await pool.query(query, [type])
      return result.rows
    } catch (error) {
      throw new Error(`Error getting notifications by type: ${error.message}`)
    }
  }

  // Get notifications by priority
  static async getByPriority(priority) {
    try {
      const query = `
        SELECT n.*, au.full_name as author_name
        FROM notifications n
        LEFT JOIN admin_users au ON n.author_id = au.id
        WHERE n.is_active = TRUE 
        AND n.priority = $1
        AND (n.expires_at IS NULL OR n.expires_at > CURRENT_TIMESTAMP)
        ORDER BY n.created_at DESC
      `
      
      const result = await pool.query(query, [priority])
      return result.rows
    } catch (error) {
      throw new Error(`Error getting notifications by priority: ${error.message}`)
    }
  }

  // Update notification
  static async update(id, notificationData) {
    const {
      title,
      message,
      type,
      priority,
      is_active,
      show_banner,
      expires_at
    } = notificationData

    try {
      const query = `
        UPDATE notifications 
        SET title = $1, message = $2, type = $3, priority = $4,
            is_active = $5, show_banner = $6, expires_at = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
      `
      
      const values = [title, message, type, priority, is_active, show_banner, expires_at, id]
      const result = await pool.query(query, values)
      
      return result.rows[0] || null
    } catch (error) {
      throw new Error(`Error updating notification: ${error.message}`)
    }
  }

  // Deactivate notification
  static async deactivate(id) {
    try {
      const query = `
        UPDATE notifications 
        SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `
      
      const result = await pool.query(query, [id])
      return result.rows[0] || null
    } catch (error) {
      throw new Error(`Error deactivating notification: ${error.message}`)
    }
  }

  // Delete notification (hard delete)
  static async delete(id) {
    try {
      const query = `
        DELETE FROM notifications 
        WHERE id = $1
        RETURNING *
      `
      
      const result = await pool.query(query, [id])
      return result.rows[0] || null
    } catch (error) {
      throw new Error(`Error deleting notification: ${error.message}`)
    }
  }

  // Clean up expired notifications
  static async cleanupExpired() {
    try {
      const query = `
        UPDATE notifications 
        SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
        WHERE expires_at IS NOT NULL 
        AND expires_at <= CURRENT_TIMESTAMP
        AND is_active = TRUE
        RETURNING id, title
      `
      
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error(`Error cleaning up expired notifications: ${error.message}`)
    }
  }

  // Get notification statistics
  static async getStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN is_active = TRUE THEN 1 END) as active,
          COUNT(CASE WHEN show_banner = TRUE AND is_active = TRUE THEN 1 END) as banners,
          COUNT(CASE WHEN expires_at IS NOT NULL AND expires_at <= CURRENT_TIMESTAMP THEN 1 END) as expired
        FROM notifications
      `
      
      const result = await pool.query(query)
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error getting notification statistics: ${error.message}`)
    }
  }
}

export default Notification