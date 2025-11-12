import express from 'express';
import {
  getAllFaculty,
  getFacultyByDesignation,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  updateFacultyOrder,
  bulkUpdateFacultyOrder,
  searchFaculty
} from '../controllers/facultyPostgresController.js';
import { authenticateAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllFaculty);
router.get('/designation/:designation', getFacultyByDesignation);
router.get('/search', searchFaculty);
router.get('/:id', getFacultyById);

// Protected admin routes
router.post('/', authenticateAdmin, createFaculty);
router.put('/:id', authenticateAdmin, updateFaculty);
router.delete('/:id', authenticateAdmin, deleteFaculty);
router.put('/order/update', authenticateAdmin, updateFacultyOrder);
router.put('/order/bulk', authenticateAdmin, bulkUpdateFacultyOrder);

export default router;