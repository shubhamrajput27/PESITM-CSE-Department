import { Link } from 'react-router-dom'
import { Code2, Users, Award, TrendingUp, ArrowRight, BookOpen, Cpu } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import AnnouncementBanner from '../components/AnnouncementBanner'
import NewsEventsSection from '../components/NewsEventsSection'
import { motion } from 'framer-motion'

const Home = () => {
  const stats = [
    { icon: <Users size={32} />, value: '50+', label: 'Faculty Members' },
    { icon: <Users size={32} />, value: '1000+', label: 'Students' },
    { icon: <Award size={32} />, value: '95%', label: 'Placement Rate' },
    { icon: <TrendingUp size={32} />, value: '20+', label: 'Research Projects' },
  ]

  const highlights = [
    {
      icon: <Code2 size={40} />,
      title: 'Industry-Ready Curriculum',
      description: 'Aligned with latest industry trends and technologies',
    },
    {
      icon: <Cpu size={40} />,
      title: 'State-of-the-Art Labs',
      description: 'Modern computing facilities for hands-on learning',
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Research Excellence',
      description: 'Active research in AI, ML, IoT, and Cybersecurity',
    },
  ]

  return (
    <div className="bg-white">
      {/* Announcement Banner */}
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section className="relative bg-white text-pesitm-blue py-20 md:py-32">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Computer Science & Engineering
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-pesitm-gold font-semibold">
                Innovate. Code. Transform.
              </p>
              <p className="text-lg mb-8 text-gray-700">
                PES Institute of Technology and Management, Shivamogga
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn-secondary">
                  Learn More <ArrowRight className="inline ml-2" size={20} />
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-pesitm-blue text-pesitm-blue font-semibold rounded-lg hover:bg-pesitm-blue hover:text-white transition">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" 
                  alt="Computer Science" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="flex justify-center mb-3 text-pesitm-blue">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-pesitm-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-12">
              Why Choose CSE at PESITM?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="card text-center hover:scale-105 transition-transform">
                  <div className="flex justify-center mb-4 text-pesitm-blue">
                    {highlight.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <NewsEventsSection />

      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-12">Explore More</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/faculty" className="card hover:bg-pesitm-blue hover:text-white group transition-all">
              <h3 className="text-xl font-bold mb-3">Our Faculty</h3>
              <p className="text-gray-600 group-hover:text-gray-200 mb-4">
                Meet our experienced and dedicated faculty members
              </p>
              <span className="text-pesitm-gold group-hover:text-white font-semibold">
                View Faculty →
              </span>
            </Link>

            <Link to="/research" className="card hover:bg-pesitm-blue hover:text-white group transition-all">
              <h3 className="text-xl font-bold mb-3">Research & Labs</h3>
              <p className="text-gray-600 group-hover:text-gray-200 mb-4">
                Explore our cutting-edge research and facilities
              </p>
              <span className="text-pesitm-gold group-hover:text-white font-semibold">
                Learn More →
              </span>
            </Link>

            <Link to="/events" className="card hover:bg-pesitm-blue hover:text-white group transition-all">
              <h3 className="text-xl font-bold mb-3">Events & News</h3>
              <p className="text-gray-600 group-hover:text-gray-200 mb-4">
                Stay updated with latest events and activities
              </p>
              <span className="text-pesitm-gold group-hover:text-white font-semibold">
                View Events →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-pesitm-blue">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              Join the CSE Department at PESITM and shape your future in technology
            </p>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default Home
