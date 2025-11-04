import Research from '../models/Research.js'

// Get all research projects
export const getAllResearch = async (req, res) => {
  try {
    const research = await Research.find({ isActive: true }).sort({ year: -1 })
    res.status(200).json(research)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching research', error: error.message })
  }
}

// Get research by area
export const getResearchByArea = async (req, res) => {
  try {
    const research = await Research.find({ 
      isActive: true, 
      area: req.params.area 
    }).sort({ year: -1 })
    res.status(200).json(research)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching research', error: error.message })
  }
}

// Get single research project by ID
export const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id)
    if (!research) {
      return res.status(404).json({ success: false, message: 'Research project not found' })
    }
    res.status(200).json(research)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching research', error: error.message })
  }
}

// Create new research project
export const createResearch = async (req, res) => {
  try {
    const research = new Research(req.body)
    await research.save()
    res.status(201).json({ success: true, message: 'Research project created successfully', data: research })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating research', error: error.message })
  }
}

// Update research project
export const updateResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!research) {
      return res.status(404).json({ success: false, message: 'Research project not found' })
    }
    res.status(200).json({ success: true, message: 'Research project updated successfully', data: research })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating research', error: error.message })
  }
}

// Delete research project
export const deleteResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!research) {
      return res.status(404).json({ success: false, message: 'Research project not found' })
    }
    res.status(200).json({ success: true, message: 'Research project deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting research', error: error.message })
  }
}
