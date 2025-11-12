import express from 'express';
import {
  getAllEvents,
  getUpcomingEvents,
  getFeaturedEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  updateEventOrder,
  bulkUpdateEventOrder,
  getEventsByCategory,
  searchEvents
} from '../controllers/eventsPostgresController.js';
import { authenticateAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/featured', getFeaturedEvents);
router.get('/category/:category', getEventsByCategory);
router.get('/search', searchEvents);
router.get('/:id', getEventById);

// Protected admin routes
router.post('/', authenticateAdmin, createEvent);
router.put('/:id', authenticateAdmin, updateEvent);
router.delete('/:id', authenticateAdmin, deleteEvent);
router.put('/order/update', authenticateAdmin, updateEventOrder);
router.put('/order/bulk', authenticateAdmin, bulkUpdateEventOrder);

export default router;