import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Faculty from './models/Faculty.js'
import Event from './models/Event.js'
import Research from './models/Research.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pesitm-cse')
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Faculty.deleteMany({})
    await Event.deleteMany({})
    await Research.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Seed Faculty
    const facultyData = [
      {
        name: 'Dr. Arjun U',
        designation: 'Professor & HOD',
        specialization: 'Machine Learning, Data Mining',
        email: 'arjun.u@pestrust.edu.in',
        bio: 'Expert in Machine Learning and Data Analytics with 20+ years of experience',
        experience: 20
      },
      {
        name: 'Dr. Priya Sharma',
        designation: 'Associate Professor',
        specialization: 'Artificial Intelligence, Neural Networks',
        email: 'priya.sharma@pestrust.edu.in',
        bio: 'Research focus on AI and Deep Learning applications',
        experience: 15
      },
      {
        name: 'Prof. Rajesh Kumar',
        designation: 'Assistant Professor',
        specialization: 'Cybersecurity, Network Security',
        email: 'rajesh.kumar@pestrust.edu.in',
        bio: 'Specialist in Cybersecurity and Ethical Hacking',
        experience: 8
      },
      {
        name: 'Dr. Anita Desai',
        designation: 'Associate Professor',
        specialization: 'Cloud Computing, IoT',
        email: 'anita.desai@pestrust.edu.in',
        bio: 'Expert in Cloud Technologies and IoT Systems',
        experience: 12
      },
      {
        name: 'Prof. Vikram Singh',
        designation: 'Assistant Professor',
        specialization: 'Software Engineering, Web Development',
        email: 'vikram.singh@pestrust.edu.in',
        bio: 'Passionate about Software Development and Agile methodologies',
        experience: 6
      }
    ]

    await Faculty.insertMany(facultyData)
    console.log('✅ Faculty data seeded')

    // Seed Events
    const eventsData = [
      {
        title: 'National Level Technical Symposium - TECHNOVATE 2024',
        description: 'Annual technical fest featuring coding competitions, hackathons, paper presentations, and tech talks by industry experts.',
        date: new Date('2024-12-15'),
        venue: 'PESITM Main Auditorium',
        category: 'Technical Fest',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      },
      {
        title: 'Workshop on Machine Learning and AI',
        description: 'Two-day hands-on workshop covering fundamentals of ML, neural networks, and practical implementation using Python.',
        date: new Date('2024-11-20'),
        venue: 'AI/ML Lab',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'
      },
      {
        title: 'CodeSprint - 24 Hour Hackathon',
        description: 'Intense 24-hour coding marathon where teams build innovative solutions to real-world problems.',
        date: new Date('2024-12-01'),
        venue: 'CSE Department Labs',
        category: 'Hackathon',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
      }
    ]

    await Event.insertMany(eventsData)
    console.log('✅ Events data seeded')

    // Seed Research
    const researchData = [
      {
        title: 'Smart Healthcare Monitoring using IoT',
        description: 'Development of real-time patient monitoring system using IoT sensors and cloud computing',
        faculty: 'Dr. Anita Desai',
        area: 'IoT',
        year: '2024',
        status: 'ongoing'
      },
      {
        title: 'Intrusion Detection using Machine Learning',
        description: 'AI-based network intrusion detection and prevention system using deep learning',
        faculty: 'Prof. Rajesh Kumar',
        area: 'Cybersecurity',
        year: '2024',
        status: 'ongoing'
      },
      {
        title: 'Predictive Analytics for Student Performance',
        description: 'Big data analytics for predicting student academic outcomes and personalized learning',
        faculty: 'Dr. Priya Sharma',
        area: 'Artificial Intelligence',
        year: '2023',
        status: 'completed'
      }
    ]

    await Research.insertMany(researchData)
    console.log('✅ Research data seeded')

    console.log('🎉 Database seeding completed successfully!')
    process.exit(0)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()
