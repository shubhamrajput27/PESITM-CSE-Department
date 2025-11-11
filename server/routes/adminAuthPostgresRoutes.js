import express from 'express'
import {
  adminLogin,
  verifyAdminToken,
  getAdminProfile,
  adminLogout,
  changeAdminPassword,
  getAllAdminUsers
} from '../controllers/adminAuthPostgresController.js'

const router = express.Router()

// Public routes
router.post('/login', adminLogin)

// Protected routes (require authentication)
router.use(verifyAdminToken) // Apply middleware to all routes below

router.get('/profile', getAdminProfile)
router.post('/logout', adminLogout)
router.post('/change-password', changeAdminPassword)
router.get('/users', getAllAdminUsers) // Super admin only

export default router