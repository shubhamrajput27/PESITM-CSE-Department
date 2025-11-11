# PESITM CSE Portal - PostgreSQL Setup Guide

## 🗄️ PostgreSQL Database Setup

### 1. Install PostgreSQL
**Windows:**
```bash
# Using Chocolatey
choco install postgresql

# Or download from: https://www.postgresql.org/download/windows/
```

**Mac:**
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database and User
```bash
# Access PostgreSQL as superuser
sudo -u postgres psql

# Create database
CREATE DATABASE pesitm_cse_portal;

# Create user (optional - you can use 'postgres' user)
CREATE USER pesitm_admin WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE pesitm_cse_portal TO pesitm_admin;

# Exit
\q
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and update:
```bash
cp .env.example .env
```

Edit `.env` file:
```env
# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pesitm_cse_portal
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=pesitm-cse-admin-secret-key-2024-very-secure
JWT_EXPIRY=24h
```

### 4. Install Dependencies
```bash
cd server
npm install pg dotenv
```

### 5. Initialize Database
```bash
# Create tables and insert default admin users
npm run init:postgres

# Or use the alias
npm run setup
```

## 🚀 Running the Application

### 1. Start PostgreSQL Service
**Windows:**
```bash
# PostgreSQL should start automatically
# Or manually: net start postgresql-x64-14
```

**Mac:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

### 2. Start the Application
```bash
# From project root
npm run dev

# This will start both frontend (port 3000) and backend (port 5000)
```

## 🔐 Default Admin Credentials

| Username | Password | Role | Full Name |
|----------|----------|------|-----------|
| admin | admin123 | super_admin | System Administrator |
| hod | hod123 | admin | Dr. Prasanna Kumar H R (HOD) |
| faculty | faculty123 | moderator | Prof. Priya Sharma |
| coordinator | coord123 | admin | Dr. Amit Verma |
| assistant | assist123 | moderator | Ms. Kavya Reddy |

## 🌐 Admin Panel Access

1. **Frontend**: http://localhost:3000/admin
2. **Backend API**: http://localhost:5000/api/admin

### Available API Endpoints:
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile (protected)
- `POST /api/admin/logout` - Admin logout (protected)
- `POST /api/admin/change-password` - Change password (protected)
- `GET /api/admin/users` - Get all admin users (super admin only)

## 🔧 Features

### ✅ Authentication Features:
- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Account Locking**: Auto-lock after 5 failed attempts (30 minutes)
- **Role-based Access**: super_admin, admin, moderator roles
- **Activity Logging**: Track all admin actions
- **Session Management**: JWT token verification

### ✅ Security Features:
- **SQL Injection Protection**: Parameterized queries
- **Password Strength**: Minimum 8 characters
- **Account Security**: Failed attempt tracking
- **Audit Trail**: Complete activity logging
- **Token Expiry**: 24-hour token lifetime

### ✅ Database Features:
- **PostgreSQL**: Production-ready database
- **Proper Indexes**: Optimized queries
- **Foreign Keys**: Data integrity
- **Triggers**: Auto-update timestamps
- **Views**: Secure data access

## 🛠️ Troubleshooting

### PostgreSQL Connection Issues:
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # Mac

# Check connection
psql -h localhost -U postgres -d pesitm_cse_portal
```

### Database Reset:
```bash
# Drop and recreate database
sudo -u postgres psql
DROP DATABASE pesitm_cse_portal;
CREATE DATABASE pesitm_cse_portal;
\q

# Re-initialize
npm run init:postgres
```

### Permission Issues:
```bash
# Grant all privileges to user
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE pesitm_cse_portal TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

## 📊 Database Schema

### Tables Created:
1. **admin_users** - Admin user accounts
2. **admin_sessions** - JWT session management
3. **admin_activity_log** - Audit trail

### Key Features:
- **Indexes** on frequently queried columns
- **Triggers** for automatic timestamp updates
- **Foreign Keys** for data integrity
- **JSONB** fields for flexible data storage
- **Views** for secure data access

## 🔄 Migration from MongoDB

If you were using MongoDB before:
1. Export existing admin data
2. Run PostgreSQL setup
3. Import data using custom migration script
4. Update environment variables
5. Test authentication

The system now supports both MongoDB (for other collections) and PostgreSQL (for admin users) simultaneously if needed.

---

**🎉 Your PESITM CSE Portal with PostgreSQL admin system is now ready!**