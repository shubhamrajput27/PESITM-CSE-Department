import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <Link to="/" className="block hover:opacity-90 transition-opacity">
          <img 
            src="/PESITM.jpg" 
            alt="PES Institute of Technology & Management - NH-206, Sagar Road, Shivamogga - 577204" 
            className="w-full h-auto max-h-24 object-contain"
          />
        </Link>
      </div>
    </div>
  )
}

export default Header
