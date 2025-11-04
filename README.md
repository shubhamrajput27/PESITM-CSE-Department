# PESITM CSE Department Website

A modern, dynamic website for the Computer Science & Engineering Department of PES Institute of Technology and Management (PESITM), Shivamogga, built using the MERN stack.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Content**: All data fetched from MongoDB database
- **Faculty Management**: Display faculty profiles with specializations
- **Events & News**: Showcase department events, workshops, and seminars
- **Research Showcase**: Highlight ongoing research projects and areas
- **Student Achievements**: Display placements and internships
- **Contact Form**: Functional contact form with email notifications
- **Smooth Animations**: Framer Motion for engaging user experience

## 📁 Project Structure

```
pesitm-cse-website/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images and static files
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js Backend
│   ├── routes/           # API routes
│   ├── models/           # Mongoose models
│   ├── controllers/      # Route controllers
│   └── server.js         # Express server
│
├── .env.example          # Environment variables template
└── README.md            # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **Nodemailer**: Email sending
- **CORS**: Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pesitm-cse-website
```

### 2. Backend Setup

```bash
cd server
npm install

# Create .env file
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/pesitm-cse
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pesitm-cse

PORT=5000
NODE_ENV=development

# Email Configuration (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=cse@pestrust.edu.in
```

**Note for Gmail**: You need to create an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

### 3. Frontend Setup

```bash
cd ../client
npm install

# Create .env file
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will start at `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend will start at `http://localhost:3000`

### Production Build

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

**Backend:**
```bash
cd server
npm start
```

## 📊 Database Seeding (Optional)

To populate the database with sample data, you can use MongoDB Compass or create a seed script:

```javascript
// Example: Create sample faculty
POST http://localhost:5000/api/faculty
Content-Type: application/json

{
  "name": "Dr. Arjun U",
  "designation": "Professor & HOD",
  "specialization": "Machine Learning, Data Mining",
  "email": "arjun.u@pestrust.edu.in",
  "bio": "Expert in Machine Learning and Data Analytics"
}
```

## 🌐 API Endpoints

### Faculty
- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/:id` - Get single faculty
- `POST /api/faculty` - Create faculty
- `PUT /api/faculty/:id` - Update faculty
- `DELETE /api/faculty/:id` - Delete faculty

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Research
- `GET /api/research` - Get all research projects
- `GET /api/research/area/:area` - Get research by area
- `GET /api/research/:id` - Get single research
- `POST /api/research` - Create research
- `PUT /api/research/:id` - Update research
- `DELETE /api/research/:id` - Delete research

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact
- `PATCH /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Update environment variables in Vercel dashboard

### Backend Deployment (Render)

1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
5. Add environment variables in Render dashboard

### Alternative: Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Deploy:
```bash
cd server
railway login
railway init
railway up
```

## 🎨 Customization

### Colors
Edit `client/tailwind.config.js` to change the color scheme:

```javascript
colors: {
  pesitm: {
    blue: '#003366',    // Primary blue
    gold: '#FFB81C',    // Accent gold
  }
}
```

### Content
- Update faculty data in `Faculty` page
- Modify about text in `About` page
- Change contact details in `Contact` page and `Footer` component

## 📝 Environment Variables

### Server (.env)
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `EMAIL_USER`: Email address for sending notifications
- `EMAIL_PASSWORD`: Email app password
- `ADMIN_EMAIL`: Admin email for receiving contact forms

### Client (.env)
- `VITE_API_URL`: Backend API URL

## 🔒 Security Notes

- Never commit `.env` files
- Use environment variables for sensitive data
- Implement authentication for admin routes in production
- Enable CORS only for trusted domains
- Use HTTPS in production
- Regularly update dependencies

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running (`mongod` command)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change the PORT in `.env` or kill the process using that port

### Email Not Sending
- Check Gmail app password is correct
- Enable "Less secure app access" (not recommended) or use App Passwords
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

**CSE Department, PESITM Shivamogga**
- Email: cse@pestrust.edu.in
- Phone: +91-8182-235555
- Website: https://pestrust.edu.in/pesitm/

## 🙏 Acknowledgments

- PES Institute of Technology and Management, Shivamogga
- VTU, Belagavi
- All faculty and staff members

---

**Made with ❤️ for PESITM CSE Department**
