import mongoose from 'mongoose'

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Faculty name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Professor & HOD']
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  qualifications: [{
    type: String
  }],
  experience: {
    type: Number,
    min: 0
  },
  publications: [{
    title: String,
    year: Number,
    journal: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Faculty = mongoose.model('Faculty', facultySchema)

export default Faculty
