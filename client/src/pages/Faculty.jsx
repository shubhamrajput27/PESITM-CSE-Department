import { useState, useEffect } from 'react'
import axios from 'axios'
import AnimatedSection from '../components/AnimatedSection'
import LoadingSpinner from '../components/LoadingSpinner'
import { Mail, User, Filter } from 'lucide-react'

const Faculty = () => {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('/api/faculty')
      setFaculty(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching faculty:', error)
      // Use placeholder data if API fails
      setFaculty(placeholderFaculty)
      setLoading(false)
    }
  }

  const placeholderFaculty = [
    {
      _id: '1',
      name: 'Dr. Arjun U',
      designation: 'Professor & HOD',
      specialization: 'Machine Learning, Data Mining',
      email: 'arjun.u@pestrust.edu.in',
      image: 'https://via.placeholder.com/150',
      bio: 'Expert in Machine Learning and Data Analytics'
    },
    {
      _id: '2',
      name: 'Dr. Priya Sharma',
      designation: 'Associate Professor',
      specialization: 'Artificial Intelligence, Neural Networks',
      email: 'priya.sharma@pestrust.edu.in',
      image: 'https://via.placeholder.com/150',
      bio: 'Research focus on AI and Deep Learning'
    },
    {
      _id: '3',
      name: 'Prof. Rajesh Kumar',
      designation: 'Assistant Professor',
      specialization: 'Cybersecurity, Network Security',
      email: 'rajesh.kumar@pestrust.edu.in',
      image: 'https://via.placeholder.com/150',
      bio: 'Specialist in Cybersecurity and Ethical Hacking'
    },
    {
      _id: '4',
      name: 'Dr. Anita Desai',
      designation: 'Associate Professor',
      specialization: 'Cloud Computing, IoT',
      email: 'anita.desai@pestrust.edu.in',
      image: 'https://via.placeholder.com/150',
      bio: 'Expert in Cloud Technologies and IoT Systems'
    },
    {
      _id: '5',
      name: 'Prof. Vikram Singh',
      designation: 'Assistant Professor',
      specialization: 'Software Engineering, Web Development',
      email: 'vikram.singh@pestrust.edu.in',
      image: 'https://via.placeholder.com/150',
      bio: 'Passionate about Software Development and Agile'
    },
    {
      _id: '6',
      name: 'Dr. Meena Patel',
      designation: 'Associate Professor',
      specialization: 'Database Systems, Big Data',
      email: 'meena.patel@pestrust.edu.in',
      image: 'https://via.placeholder.com/150',
      bio: 'Research in Big Data Analytics and NoSQL'
    },
  ]

  const designations = ['all', 'Professor', 'Associate Professor', 'Assistant Professor']

  const filteredFaculty = filter === 'all' 
    ? faculty 
    : faculty.filter(f => f.designation.includes(filter))

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pesitm-blue to-blue-900 text-white py-16">
        <div className="container-custom">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
            <p className="text-xl text-gray-200">Meet our experienced and dedicated team</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
            <Filter size={20} className="text-pesitm-blue" />
            {designations.map((designation) => (
              <button
                key={designation}
                onClick={() => setFilter(designation)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === designation
                    ? 'bg-pesitm-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {designation === 'all' ? 'All Faculty' : designation}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFaculty.map((member, index) => (
                <AnimatedSection key={member._id} delay={index * 0.1}>
                  <div className="card hover:scale-105 transition-transform">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-pesitm-blue mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-pesitm-gold mb-2">
                        {member.designation}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {member.specialization}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Mail size={16} />
                        <a 
                          href={`mailto:${member.email}`}
                          className="hover:text-pesitm-blue transition"
                        >
                          {member.email}
                        </a>
                      </div>
                      {member.bio && (
                        <p className="text-sm text-gray-600 mt-4 italic">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {!loading && filteredFaculty.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No faculty members found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Faculty
