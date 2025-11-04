import Faculty from '../models/Faculty.js'

// Get all faculty members
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true }).sort({ designation: 1, name: 1 })
    res.status(200).json(faculty)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching faculty', error: error.message })
  }
}

// Get single faculty member by ID
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' })
    }
    res.status(200).json(faculty)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching faculty', error: error.message })
  }
}

// Create new faculty member
export const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body)
    await faculty.save()
    res.status(201).json({ success: true, message: 'Faculty member created successfully', data: faculty })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating faculty', error: error.message })
  }
}

// Update faculty member
export const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' })
    }
    res.status(200).json({ success: true, message: 'Faculty member updated successfully', data: faculty })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating faculty', error: error.message })
  }
}

// Delete faculty member
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' })
    }
    res.status(200).json({ success: true, message: 'Faculty member deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting faculty', error: error.message })
  }
}
