import express from 'express'
import {
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventsController.js'

const router = express.Router()

// GET all events
router.get('/', getAllEvents)

// GET upcoming events
router.get('/upcoming', getUpcomingEvents)

// GET single event by ID
router.get('/:id', getEventById)

// POST create new event
router.post('/', createEvent)

// PUT update event
router.put('/:id', updateEvent)

// DELETE event (soft delete)
router.delete('/:id', deleteEvent)

export default router
