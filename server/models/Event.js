import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  venue: {
    type: String,
    required: [true, 'Venue is required']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },
  category: {
    type: String,
    enum: ['Workshop', 'Seminar', 'Hackathon', 'Guest Lecture', 'Technical Fest', 'Networking', 'Seminar Series'],
    default: 'Workshop'
  },
  organizer: {
    type: String
  },
  attendees: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index for sorting by date
eventSchema.index({ date: -1 })

const Event = mongoose.model('Event', eventSchema)

export default Event
