import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import AnimatedSection from '../components/AnimatedSection'
import LoadingSpinner from '../components/LoadingSpinner'
import { Calendar, MapPin, Users, FileText } from 'lucide-react'

const Events = () => {
  const [searchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('events')

  useEffect(() => {
    // Check URL parameter for tab
    const tabParam = searchParams.get('tab')
    if (tabParam === 'news') {
      setActiveTab('news')
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    fetchData()
  }, [searchParams])

  const fetchData = async () => {
    try {
      // Fetch events
      const eventsResponse = await axios.get('http://localhost:5000/api/events')
      if (eventsResponse.data.success) {
        setEvents(eventsResponse.data.data)
      } else {
        setEvents(placeholderEvents)
      }

      // Fetch news
      const newsResponse = await axios.get('http://localhost:5000/api/news')
      if (newsResponse.data.success) {
        setNews(newsResponse.data.data)
      } else {
        setNews(placeholderNews)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setEvents(placeholderEvents)
      setNews(placeholderNews)
      setLoading(false)
    }
  }

  const placeholderNews = [
    {
      id: '1',
      title: 'Welcome to CSE Department Portal',
      excerpt: 'New department portal launched with enhanced features for students and faculty',
      category: 'announcement',
      image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      published_at: '2024-11-10T10:00:00Z'
    },
    {
      id: '2',
      title: 'Research Collaboration with Industry',
      excerpt: 'New partnerships established with leading tech companies for research projects',
      category: 'research',
      image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      published_at: '2024-11-08T14:30:00Z'
    },
    {
      id: '3',
      title: 'Student Achievements in National Competition',
      excerpt: 'CSE students win first place in national level hackathon competition',
      category: 'achievement',
      image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      published_at: '2024-11-05T16:45:00Z'
    },
    {
      id: '4',
      title: 'New Computer Lab with Advanced Infrastructure',
      excerpt: 'State-of-the-art computer lab inaugurated with latest hardware and software',
      category: 'announcement',
      image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      published_at: '2024-11-03T09:00:00Z'
    },
    {
      id: '5',
      title: 'Faculty Publications in Top Journals',
      excerpt: 'Department faculty members publish research papers in prestigious international journals',
      category: 'research',
      image_url: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=800',
      published_at: '2024-10-28T11:20:00Z'
    },
    {
      id: '6',
      title: 'Placement Drive: 150+ Students Placed',
      excerpt: 'Record placement season with students securing positions in top tech companies',
      category: 'achievement',
      image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
      published_at: '2024-10-25T15:30:00Z'
    }
  ]

  const placeholderEvents = [
    {
      _id: '1',
      title: 'National Level Technical Symposium - TECHNOVATE 2024',
      date: '2024-12-15',
      description: 'Annual technical fest featuring coding competitions, hackathons, paper presentations, and tech talks by industry experts.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      venue: 'PESITM Main Auditorium',
      category: 'Technical Fest'
    },
    {
      _id: '2',
      title: 'Workshop on Machine Learning and AI',
      date: '2024-11-20',
      description: 'Two-day hands-on workshop covering fundamentals of ML, neural networks, and practical implementation using Python.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      venue: 'AI/ML Lab',
      category: 'Workshop'
    },
    {
      _id: '3',
      title: 'Guest Lecture on Cloud Computing by AWS Expert',
      date: '2024-11-25',
      description: 'Industry expert from Amazon Web Services sharing insights on cloud architecture and career opportunities.',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
      venue: 'Seminar Hall',
      category: 'Guest Lecture'
    },
    {
      _id: '4',
      title: 'CodeSprint - 24 Hour Hackathon',
      date: '2024-12-01',
      description: 'Intense 24-hour coding marathon where teams build innovative solutions to real-world problems.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      venue: 'CSE Department Labs',
      category: 'Hackathon'
    },
    {
      _id: '5',
      title: 'Cybersecurity Awareness Week',
      date: '2024-11-28',
      description: 'Week-long series of sessions on ethical hacking, network security, and cyber threats awareness.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      venue: 'Various Locations',
      category: 'Seminar Series'
    },
    {
      _id: '6',
      title: 'Alumni Meetup and Networking Event',
      date: '2024-12-10',
      description: 'Connect with successful alumni working in top tech companies, share experiences, and network.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      venue: 'College Grounds',
      category: 'Networking'
    },
  ]

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pesitm-blue to-blue-900 text-white py-16">
        <div className="container-custom">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
            <p className="text-xl text-gray-200">Stay updated with latest happenings</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white py-8 border-b">
        <div className="container-custom">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-8 py-3 border-2 font-semibold rounded-lg transition flex items-center space-x-2 ${
                activeTab === 'events'
                  ? 'bg-pesitm-blue text-white border-pesitm-blue'
                  : 'border-pesitm-blue text-pesitm-blue hover:bg-pesitm-blue hover:text-white'
              }`}
            >
              <Calendar size={20} />
              <span>Upcoming Events</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-8 py-3 border-2 font-semibold rounded-lg transition flex items-center space-x-2 ${
                activeTab === 'news'
                  ? 'bg-pesitm-blue text-white border-pesitm-blue'
                  : 'border-pesitm-blue text-pesitm-blue hover:bg-pesitm-blue hover:text-white'
              }`}
            >
              <FileText size={20} />
              <span>Latest News</span>
            </button>
          </div>
        </div>
      </section>

      {/* Events/News Grid */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeTab === 'events' ? (
                events.map((event, index) => (
                  <AnimatedSection key={event._id} delay={index * 0.1}>
                    <div className="card overflow-hidden p-0 hover:scale-105 transition-transform">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="inline-block px-3 py-1 bg-pesitm-gold text-pesitm-blue text-xs font-semibold rounded-full mb-3">
                          {event.category}
                        </div>
                        <h3 className="text-xl font-bold text-pesitm-blue mb-3 line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {event.description}
                        </p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-pesitm-blue" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} className="text-pesitm-blue" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))
              ) : (
                news.map((newsItem, index) => (
                  <AnimatedSection key={newsItem.id} delay={index * 0.1}>
                    <div className="card overflow-hidden p-0 hover:scale-105 transition-transform">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={newsItem.image_url}
                          alt={newsItem.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="inline-block px-3 py-1 bg-pesitm-blue text-white text-xs font-semibold rounded-full mb-3">
                          {newsItem.category?.charAt(0).toUpperCase() + newsItem.category?.slice(1)}
                        </div>
                        <h3 className="text-xl font-bold text-pesitm-blue mb-3 line-clamp-2">
                          {newsItem.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {newsItem.excerpt}
                        </p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <FileText size={16} className="text-pesitm-blue" />
                            <span>{formatDate(newsItem.published_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))
              )}
            </div>
          )}

          {!loading && activeTab === 'events' && events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No upcoming events at the moment.</p>
            </div>
          )}

          {!loading && activeTab === 'news' && news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No news articles at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-12">Recent Highlights</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="card text-center">
                <div className="text-4xl font-bold text-pesitm-blue mb-2">50+</div>
                <p className="text-gray-600">Events Conducted This Year</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="card text-center">
                <div className="text-4xl font-bold text-pesitm-blue mb-2">1000+</div>
                <p className="text-gray-600">Student Participants</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="card text-center">
                <div className="text-4xl font-bold text-pesitm-blue mb-2">30+</div>
                <p className="text-gray-600">Industry Experts Invited</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
