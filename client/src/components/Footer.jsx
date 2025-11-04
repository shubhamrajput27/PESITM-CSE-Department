import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-pesitm-blue text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CSE Department</h3>
            <p className="text-gray-300 text-sm">
              PES Institute of Technology and Management, Shivamogga, is committed 
              to excellence in computing education and research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-pesitm-gold transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-pesitm-gold transition">About</Link></li>
              <li><Link to="/faculty" className="text-gray-300 hover:text-pesitm-gold transition">Faculty</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-pesitm-gold transition">Events</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-pesitm-gold transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-gray-300">NH-206, Sagar Road, Shivamogga – 577204</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-gray-300">+91-8182-235555</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-gray-300">cse@pestrust.edu.in</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-800 rounded-full hover:bg-pesitm-gold hover:text-pesitm-blue transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-blue-800 rounded-full hover:bg-pesitm-gold hover:text-pesitm-blue transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-blue-800 rounded-full hover:bg-pesitm-gold hover:text-pesitm-blue transition">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="mt-4">
              <a 
                href="https://pestrust.edu.in/pesitm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-pesitm-gold transition"
              >
                Visit PESITM Main Website →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© {currentYear} Computer Science & Engineering Department, PESITM Shivamogga. All rights reserved.</p>
          <p className="mt-2">Affiliated to Visvesvaraya Technological University, Belagavi</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
