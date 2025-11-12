import express from 'express';
import {
  getAllResearch,
  getResearchByStatus,
  getResearchByArea,
  getResearchById,
  createResearch,
  updateResearch,
  deleteResearch,
  updateResearchOrder,
  bulkUpdateResearchOrder,
  searchResearch
} from '../controllers/researchPostgresController.js';
import { authenticateAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllResearch);
router.get('/status/:status', getResearchByStatus);
router.get('/area/:area', getResearchByArea);
router.get('/search', searchResearch);
router.get('/:id', getResearchById);

// Protected admin routes
router.post('/', authenticateAdmin, createResearch);
router.put('/:id', authenticateAdmin, updateResearch);
router.delete('/:id', authenticateAdmin, deleteResearch);
router.put('/order/update', authenticateAdmin, updateResearchOrder);
router.put('/order/bulk', authenticateAdmin, bulkUpdateResearchOrder);

export default router;