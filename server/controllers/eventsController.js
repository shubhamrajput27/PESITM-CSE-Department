import Event from '../models/Event.js'

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: -1 })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching events', error: error.message })
  }
}

// Get upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ 
      isActive: true, 
      date: { $gte: new Date() }
    }).sort({ date: 1 })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching events', error: error.message })
  }
}

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching event', error: error.message })
  }
}

// Create new event
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body)
    await event.save()
    res.status(201).json({ success: true, message: 'Event created successfully', data: event })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating event', error: error.message })
  }
}

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }
    res.status(200).json({ success: true, message: 'Event updated successfully', data: event })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating event', error: error.message })
  }
}

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }
    res.status(200).json({ success: true, message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting event', error: error.message })
  }
}
