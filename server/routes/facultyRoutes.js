import express from 'express'
import {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from '../controllers/facultyController.js'

const router = express.Router()

// GET all faculty
router.get('/', getAllFaculty)

// GET single faculty by ID
router.get('/:id', getFacultyById)

// POST create new faculty
router.post('/', createFaculty)

// PUT update faculty
router.put('/:id', updateFaculty)

// DELETE faculty (soft delete)
router.delete('/:id', deleteFaculty)

export default router
