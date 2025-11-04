import mongoose from 'mongoose'

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Research title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Research description is required']
  },
  faculty: {
    type: String,
    required: [true, 'Faculty name is required']
  },
  area: {
    type: String,
    enum: ['Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'IoT', 'Cloud Computing', 'Big Data', 'Software Engineering', 'Other'],
    default: 'Other'
  },
  year: {
    type: String,
    required: [true, 'Year is required']
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing'
  },
  collaborators: [{
    type: String
  }],
  publications: [{
    title: String,
    journal: String,
    year: Number
  }],
  fundingAgency: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Research = mongoose.model('Research', researchSchema)

export default Research
