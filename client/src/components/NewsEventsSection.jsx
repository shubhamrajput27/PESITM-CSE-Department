import { useState, useEffect } from 'react'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from './AnimatedSection'
import axios from 'axios'

const NewsEventsSection = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events')
        // Get latest 6 events
        setEvents(response.data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching events:', error)
        // Fallback to sample data if API fails
        setEvents(sampleEvents)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Sample events data as fallback
  const sampleEvents = [
    {
      _id: '1',
      title: 'Latest Updates',
      description: 'Check out the newest developments and announcements from the CSE Department',
      date: new Date('2025-11-15'),
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      category: 'News'
    },
    {
      _id: '2',
      title: 'PES Inaugy Hackathon, Shivamogga - Computer Science & Engineering',
      description: 'Annual hackathon event showcasing innovative projects and solutions',
      date: new Date('2025-11-20'),
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      category: 'Hackathon'
    },
    {
      _id: '3',
      title: 'Summer Internship Program 2025',
      description: 'Applications open for summer internship opportunities with leading tech companies',
      date: new Date('2025-12-01'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      category: 'Workshop'
    },
    {
      _id: '4',
      title: 'Semester Tech Talks - IEEE Computer Society 2025',
      description: 'Weekly technical talks by industry experts and researchers',
      date: new Date('2025-11-25'),
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
      category: 'Seminar'
    },
    {
      _id: '5',
      title: 'Ethnic Days - 9th November 2025',
      description: 'Cultural celebration showcasing diversity and tradition',
      date: new Date('2025-11-09'),
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
      category: 'Cultural'
    },
    {
      _id: '6',
      title: 'College Competition, Organized by Computing Society',
      description: 'Inter-college coding competition and technical challenges',
      date: new Date('2025-11-30'),
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      category: 'Workshop'
    }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-pesitm-blue">
            News & Events
          </h2>
        </AnimatedSection>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pesitm-blue"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event, index) => (
              <AnimatedSection key={event._id} delay={index * 0.1}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden bg-navy-900">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-pesitm-gold text-navy-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category || 'Event'}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 flex-1 flex flex-col bg-navy-900 text-white">
                    <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-pesitm-gold transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 flex-1 line-clamp-3">
                      {event.description}
                    </p>

                    {/* Read More Button */}
                    <Link
                      to={`/events`}
                      className="inline-flex items-center gap-2 text-pesitm-gold hover:text-yellow-400 font-semibold transition-colors group/link"
                    >
                      <span className="border border-pesitm-gold hover:border-yellow-400 px-4 py-2 rounded transition-colors">
                        Read More
                      </span>
                      <ArrowRight 
                        size={20} 
                        className="group-hover/link:translate-x-1 transition-transform" 
                      />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* View All Button */}
        <AnimatedSection>
          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-pesitm-blue text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              View All Events
              <ArrowRight size={24} />
            </Link>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        .bg-navy-900 {
          background-color: #0D345F;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default NewsEventsSection
