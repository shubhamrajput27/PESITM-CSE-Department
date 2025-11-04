import express from 'express'
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js'

const router = express.Router()

// POST submit contact form (public)
router.post('/', submitContact)

// GET all contacts (admin only - add authentication middleware in production)
router.get('/', getAllContacts)

// GET single contact by ID
router.get('/:id', getContactById)

// PATCH update contact status
router.patch('/:id', updateContactStatus)

// DELETE contact
router.delete('/:id', deleteContact)

export default router
