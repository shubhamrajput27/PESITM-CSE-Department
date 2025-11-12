import Notification from '../models/Notification.js'

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const { includeExpired, type, priority } = req.query
    
    let notifications
    if (type) {
      notifications = await Notification.getByType(type)
    } else if (priority) {
      notifications = await Notification.getByPriority(priority)
    } else {
      notifications = await Notification.getAll(includeExpired === 'true')
    }
    
    res.status(200).json({
      success: true,
      data: notifications
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notifications', 
      error: error.message 
    })
  }
}

// Get banner notifications
export const getBannerNotifications = async (req, res) => {
  try {
    const notifications = await Notification.getBannerNotifications()
    res.status(200).json({
      success: true,
      data: notifications
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching banner notifications', 
      error: error.message 
    })
  }
}

// Get single notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.getById(req.params.id)
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      })
    }
    res.status(200).json({
      success: true,
      data: notification
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notification', 
      error: error.message 
    })
  }
}

// Create new notification (Protected - Admin only)
export const createNotification = async (req, res) => {
  try {
    const notificationData = {
      ...req.body,
      author_id: req.admin.id
    }
    
    const notification = await Notification.create(notificationData)
    res.status(201).json({ 
      success: true, 
      message: 'Notification created successfully', 
      data: notification 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating notification', 
      error: error.message 
    })
  }
}

// Update notification (Protected - Admin only)
export const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.update(req.params.id, req.body)
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      })
    }
    res.status(200).json({ 
      success: true, 
      message: 'Notification updated successfully', 
      data: notification 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating notification', 
      error: error.message 
    })
  }
}

// Deactivate notification (Protected - Admin only)
export const deactivateNotification = async (req, res) => {
  try {
    const notification = await Notification.deactivate(req.params.id)
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      })
    }
    res.status(200).json({ 
      success: true, 
      message: 'Notification deactivated successfully' 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error deactivating notification', 
      error: error.message 
    })
  }
}

// Delete notification (Protected - Admin only)
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.delete(req.params.id)
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      })
    }
    res.status(200).json({ 
      success: true, 
      message: 'Notification deleted successfully' 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error deleting notification', 
      error: error.message 
    })
  }
}

// Clean up expired notifications (Protected - Admin only)
export const cleanupExpiredNotifications = async (req, res) => {
  try {
    const expiredNotifications = await Notification.cleanupExpired()
    res.status(200).json({ 
      success: true, 
      message: `${expiredNotifications.length} expired notifications cleaned up`,
      data: expiredNotifications
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error cleaning up expired notifications', 
      error: error.message 
    })
  }
}

// Get notification statistics (Protected - Admin only)
export const getNotificationStats = async (req, res) => {
  try {
    const stats = await Notification.getStats()
    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notification statistics', 
      error: error.message 
    })
  }
}