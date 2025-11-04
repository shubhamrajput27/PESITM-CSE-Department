import express from 'express'
import {
  getAllResearch,
  getResearchByArea,
  getResearchById,
  createResearch,
  updateResearch,
  deleteResearch
} from '../controllers/researchController.js'

const router = express.Router()

// GET all research projects
router.get('/', getAllResearch)

// GET research by area
router.get('/area/:area', getResearchByArea)

// GET single research project by ID
router.get('/:id', getResearchById)

// POST create new research project
router.post('/', createResearch)

// PUT update research project
router.put('/:id', updateResearch)

// DELETE research project (soft delete)
router.delete('/:id', deleteResearch)

export default router
