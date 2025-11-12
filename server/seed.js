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
        title: 'Latest Updates',
        description: 'Check out the newest developments and announcements from the CSE Department including NBA accreditation, new faculty appointments, and upcoming initiatives.',
        date: new Date('2025-11-15'),
        venue: 'CSE Department',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        status: 'upcoming'
      },
      {
        title: 'PES Inaugy Hackathon, Shivamogga - Computer Science & Engineering',
        description: 'Annual hackathon event showcasing innovative projects and solutions by students. Register now to participate in various coding challenges and win exciting prizes.',
        date: new Date('2025-11-20'),
        venue: 'PESITM Campus',
        category: 'Hackathon',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        status: 'upcoming'
      },
      {
        title: 'Summer Internship Program 2025',
        description: 'Applications open for summer internship opportunities with leading tech companies. Gain hands-on experience in cutting-edge technologies and industry best practices.',
        date: new Date('2025-12-01'),
        venue: 'Industry Partners',
        category: 'Seminar',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        status: 'upcoming'
      },
      {
        title: 'Semester Tech Talks - IEEE Computer Society 2025',
        description: 'Weekly technical talks by industry experts and researchers covering latest trends in AI, Machine Learning, Cybersecurity, and Cloud Computing.',
        date: new Date('2025-11-25'),
        venue: 'Main Auditorium',
        category: 'Seminar Series',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
        status: 'upcoming'
      },
      {
        title: 'Ethnic Days - 9th November 2025',
        description: 'Cultural celebration showcasing diversity and tradition. Students showcase their cultural heritage through traditional attire, performances, and food.',
        date: new Date('2025-11-09'),
        venue: 'College Grounds',
        category: 'Guest Lecture',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
        status: 'completed'
      },
      {
        title: 'College Competition, Organized by Computing Society',
        description: 'Inter-college coding competition and technical challenges. Compete with students from various colleges and showcase your programming skills.',
        date: new Date('2025-11-30'),
        venue: 'CSE Labs',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        status: 'upcoming'
      },
      {
        title: 'CHAMPIONSHIP 2025-26 - 1st to 4th Year Students',
        description: 'Annual championship event for students across all years. Multiple categories including coding, project exhibition, and technical quiz competitions.',
        date: new Date('2025-12-10'),
        venue: 'Sports Complex',
        category: 'Technical Fest',
        image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800',
        status: 'upcoming'
      },
      {
        title: 'ROBOTICS WORKSHOP ON REAL MODEL - IEEE Student Branch',
        description: 'Hands-on robotics workshop where students learn to build and program real robots. Expert guidance from IEEE members and industry professionals.',
        date: new Date('2025-11-28'),
        venue: 'Robotics Lab',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        status: 'upcoming'
      },
      {
        title: 'Student Leadership Development Program',
        description: 'Leadership training program designed to develop management and soft skills among students. Guest speakers from corporate world share their experiences.',
        date: new Date('2025-12-05'),
        venue: 'Conference Hall',
        category: 'Guest Lecture',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        status: 'upcoming'
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
