import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
}

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    
    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip
    })
    await contact.save()

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const transporter = createTransporter()
        
        // Email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || 'cse@pestrust.edu.in',
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          `
        })

        // Confirmation email to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting CSE Department - PESITM',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you shortly.</p>
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
            <br>
            <p>Best regards,<br>CSE Department<br>PESITM Shivamogga</p>
          `
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message)
        // Continue even if email fails
      }
    }

    res.status(201).json({ 
      success: true, 
      message: 'Thank you for contacting us. We will get back to you soon!',
      data: contact 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error submitting contact form', 
      error: error.message 
    })
  }
}

// Get all contact messages (for admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json(contacts)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contacts', 
      error: error.message 
    })
  }
}

// Get single contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' })
    }
    
    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read'
      await contact.save()
    }
    
    res.status(200).json(contact)
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contact', 
      error: error.message 
    })
  }
}

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' })
    }
    res.status(200).json({ 
      success: true, 
      message: 'Contact status updated', 
      data: contact 
    })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating contact', 
      error: error.message 
    })
  }
}

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' })
    }
    res.status(200).json({ success: true, message: 'Contact deleted successfully' })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting contact', 
      error: error.message 
    })
  }
}
