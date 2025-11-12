import express from 'express'
import {
  getAllNotifications,
  getBannerNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deactivateNotification,
  deleteNotification,
  cleanupExpiredNotifications,
  getNotificationStats
} from '../controllers/notificationController.js'
import { verifyAdminToken } from '../controllers/adminAuthPostgresController.js'

const router = express.Router()

// Public routes
router.get('/', getAllNotifications)
router.get('/banner', getBannerNotifications)
router.get('/:id', getNotificationById)

// Protected routes (require admin authentication)
router.post('/', verifyAdminToken, createNotification)
router.put('/:id', verifyAdminToken, updateNotification)
router.patch('/:id/deactivate', verifyAdminToken, deactivateNotification)
router.delete('/:id', verifyAdminToken, deleteNotification)
router.post('/cleanup', verifyAdminToken, cleanupExpiredNotifications)
router.get('/admin/stats', verifyAdminToken, getNotificationStats)

export default router