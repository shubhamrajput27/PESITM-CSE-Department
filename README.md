# PESITM CSE Department Portal 🎓

Welcome to the official portal of the Computer Science & Engineering Department at PES Institute of Technology and Management (PESITM), Shivamogga! This modern, full-stack web application serves as a comprehensive platform for students, faculty, and visitors to stay connected with our department.

## ✨ What Makes This Portal Special?

- **Beautiful & Responsive Design**: Looks great on any device - phone, tablet, or desktop!
- **Smart Authentication System**: Secure login portals for admins, faculty members, and students
- **Real-time Updates**: Stay informed with the latest news, events, and announcements
- **Faculty Profiles**: Get to know our amazing teaching staff and their areas of expertise
- **Events Calendar**: Never miss a workshop, seminar, or hackathon happening in the department
- **Research Hub**: Explore cutting-edge research projects and collaborations
- **Interactive Animations**: Smooth, engaging user experience that makes browsing enjoyable
- **Contact Made Easy**: Direct communication channel with the department

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

We've built this portal using modern, industry-standard technologies:

### Frontend (What You See)
- **React 18** - Powers the interactive user interface
- **Vite** - Lightning-fast development and build tool
- **Tailwind CSS** - Beautiful styling made simple
- **React Router** - Smooth navigation between pages
- **Axios** - Handles all API communications
- **Lucide React** - Clean, modern icons throughout the site

### Backend (The Brain)
- **Node.js** - JavaScript runtime that powers the server
- **Express.js** - Web framework for building robust APIs
- **PostgreSQL** - Reliable, powerful SQL database for storing all data
- **JWT** - Secure authentication tokens for user sessions
- **bcrypt** - Industry-standard password encryption
- **Nodemailer** - Sends email notifications
- **CORS** - Enables secure cross-origin requests

## 📋 What You'll Need

Before getting started, make sure you have these tools installed on your computer:

- **Node.js** (version 18 or newer) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package managers (npm comes with Node.js)
- **PostgreSQL** (version 12 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - For version control [Download here](https://git-scm.com/)

Don't worry if you're new to these tools - we'll guide you through the setup! 😊

## ⚙️ Let's Get It Running!

### Step 1: Get the Code

First, let's download the project to your computer:

```bash
git clone https://github.com/shubhamrajput27/CSE-Portal-PESITM.git
cd CSE-Portal-PESITM
```

### Step 2: Set Up the Backend (Server Side)

Navigate to the server folder and install all the required packages:

```bash
cd server
npm install
```

Now, create a `.env` file in the server folder with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cse_portal_pesitm
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (for contact form notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=cse@pestrust.edu.in
```

**Quick Tips:**
- Replace `your_postgres_password` with your actual PostgreSQL password
- For Gmail, you'll need an [App Password](https://support.google.com/accounts/answer/185833) - it's more secure than your regular password!
- The JWT_SECRET can be any long, random string - this keeps your users' sessions secure

### Step 3: Set Up the Frontend (Client Side)

Now let's set up the user interface:

```bash
cd ../client
npm install
```

Create a `.env` file in the client folder:

```env
VITE_API_URL=http://localhost:5000
```

That's it for the frontend! Simple, right? 😄

### Step 4: Initialize Your PostgreSQL Database

Make sure PostgreSQL is running on your computer, then:

1. **Create the database:**
   ```bash
   # Open PostgreSQL command line or pgAdmin
   # Then run:
   CREATE DATABASE cse_portal_pesitm;
   ```

2. **Run the schema setup:**
   ```bash
   cd server
   node scripts/initPostgres.js
   ```

This will create all the necessary tables and set up some initial data, including:
- Admin user (username: `admin`, password: `admin123`)
- Sample student accounts
- Sample faculty accounts

**Default Login Credentials:**
- **Admin:** username: `admin` | password: `admin123`
- **Student:** USN: `1PE21CS001` | password: `student123`
- **Faculty:** ID: `FAC001` | password: `faculty123`

⚠️ **Important**: Please change these default passwords after your first login!

## 🚀 Let's Run It!

You'll need two terminal windows open - one for the backend and one for the frontend.

### Starting the Backend Server

Open your first terminal:

```bash
cd server
npm start
```

You should see a success message like:
```
🚀 Server running on port 5000
✅ PostgreSQL connected successfully
```

Great! Your backend is now running at `http://localhost:5000`

### Starting the Frontend

Open a second terminal:

```bash
cd client
npm run dev
```

You'll see:
```
VITE ready in [time] ms
➜ Local: http://localhost:3000/
```

Perfect! Now visit `http://localhost:3000` in your browser and explore the portal! 🎉

### Building for Production

When you're ready to deploy:

**Build the Frontend:**
```bash
cd client
npm run build
```

**Run the Backend in Production:**
```bash
cd server
npm start
```

## � User Roles & Access

Our portal has three types of users, each with their own special access:

### 🛡️ Admin
- Full control over the portal
- Manage faculty profiles, events, news, and research projects
- View and respond to contact form submissions
- Access admin dashboard at `/admin`

### 👨‍🏫 Faculty
- View and update their own profile
- Access department resources and information
- Login at `/faculty/login`

### 🎓 Students
- Access announcements and department updates
- View events, news, and faculty information
- Check placement and internship opportunities
- Login at `/student/login`

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

## 🔒 Keeping Things Secure

Security is important! Here are some best practices we follow:

- ✅ **Never share your `.env` files** - They contain sensitive passwords and secrets
- ✅ **Change default passwords** - Always update admin, faculty, and student passwords after first login
- ✅ **Use strong JWT secrets** - Make them long and random
- ✅ **Keep dependencies updated** - Run `npm audit` regularly to check for vulnerabilities
- ✅ **Use HTTPS in production** - Never run production sites on HTTP
- ✅ **Enable CORS carefully** - Only allow trusted domains to access your API
- ✅ **Backup your database** - Regular backups save lives (and data)!

Remember: A secure portal is a happy portal! 🔐

## 🐛 Running Into Issues? Let's Fix Them!

### Can't Connect to PostgreSQL?
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: 
- Make sure PostgreSQL is running on your computer
- Check if the database `cse_portal_pesitm` exists
- Verify your username and password in the `.env` file

### Port Already in Use?
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: 
- Another application is using port 5000
- Either stop that application or change the PORT in your `.env` file to something like 5001

### Login Not Working?
**Solution**:
- Make sure you ran the database initialization script (`node scripts/initPostgres.js`)
- Check that you're using the correct default credentials
- Verify the JWT_SECRET is set in your `.env` file

### Emails Not Sending?
**Solution**:
- Double-check your Gmail App Password (not your regular password!)
- Make sure EMAIL_USER and EMAIL_PASSWORD are correctly set in `.env`
- Verify your Gmail account has 2-factor authentication enabled (required for App Passwords)

### Frontend Can't Connect to Backend?
**Solution**:
- Confirm the backend server is running (check terminal for success message)
- Verify VITE_API_URL in client/.env matches your backend URL
- Check for any CORS errors in the browser console

Still stuck? Don't worry! Check the error message carefully - it usually tells you what's wrong. 😊

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

This project is open source and available under the MIT License.

## � Get In Touch

Have questions or suggestions? We'd love to hear from you!

**CSE Department, PESITM Shivamogga**
- 📧 Email: cse@pestrust.edu.in
- 📱 Phone: +91-8182-235555
- 🌐 Website: https://pestrust.edu.in/pesitm/
- 📍 Address: NH-206, Sagar Road, Shivamogga, Karnataka 577204

## 🙏 Special Thanks

This portal wouldn't be possible without:

- **PES Trust** - For their vision and support
- **PESITM Faculty & Staff** - For their valuable inputs and feedback
- **CSE Department** - For being awesome! 
- **VTU, Belagavi** - Our affiliated university
- **All Students** - The reason we built this portal

## 🤝 Want to Contribute?

We welcome contributions from students, faculty, and developers! Here's how you can help:

1. **Fork** the repository
2. **Create** a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. **Make** your changes and test them thoroughly
4. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
5. **Push** to your branch (`git push origin feature/AmazingFeature`)
6. **Open** a Pull Request

Every contribution, no matter how small, makes a difference! 💪

---

**Built with ❤️ by the PESITM CSE Community**

*Empowering students, connecting faculty, showcasing excellence!* ✨
