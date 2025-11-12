import express from 'express'
import {
  getAllNews,
  getFeaturedNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getNewsCategories,
  searchNews
} from '../controllers/newsController.js'
import { verifyAdminToken } from '../controllers/adminAuthPostgresController.js'

const router = express.Router()

// Public routes
router.get('/', getAllNews)
router.get('/featured', getFeaturedNews)
router.get('/categories', getNewsCategories)
router.get('/search', searchNews)
router.get('/:id', getNewsById)

// Protected routes (require admin authentication)
router.post('/', verifyAdminToken, createNews)
router.put('/:id', verifyAdminToken, updateNews)
router.delete('/:id', verifyAdminToken, deleteNews)

export default router