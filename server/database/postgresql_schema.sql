-- PESITM CSE Portal - PostgreSQL Database Schema
-- Admin Users Management System

-- Create database (run this separately if needed)
-- CREATE DATABASE pesitm_cse_portal;

-- Switch to the database
-- \c pesitm_cse_portal;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('super_admin', 'admin', 'moderator')) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Create admin_sessions table for JWT token management
CREATE TABLE IF NOT EXISTS admin_sessions (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for sessions
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token_hash ON admin_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_active ON admin_sessions(is_active);

-- Create admin_activity_log table for audit trail
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100),
    resource_id INTEGER,
    ip_address INET,
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for activity log
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_action ON admin_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_created_at ON admin_activity_log(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for admin_users table
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password will be hashed by application)
INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) 
VALUES ('admin', 'admin@pesitm.edu.in', 'temp_password_to_be_hashed', 'System Administrator', 'super_admin', TRUE)
ON CONFLICT (username) DO NOTHING;

-- Insert additional admin users
INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) VALUES
('hod', 'hod.cse@pesitm.edu.in', 'temp_password_to_be_hashed', 'Dr. Prasanna Kumar H R (HOD)', 'admin', TRUE),
('faculty', 'faculty@pesitm.edu.in', 'temp_password_to_be_hashed', 'Prof. Priya Sharma', 'moderator', TRUE),
('coordinator', 'coordinator@pesitm.edu.in', 'temp_password_to_be_hashed', 'Dr. Amit Verma', 'admin', TRUE),
('assistant', 'assistant@pesitm.edu.in', 'temp_password_to_be_hashed', 'Ms. Kavya Reddy', 'moderator', TRUE)
ON CONFLICT (username) DO NOTHING;

-- View to show admin users (excluding sensitive data)
CREATE OR REPLACE VIEW admin_users_view AS
SELECT 
    id,
    username,
    email,
    full_name,
    role,
    is_active,
    last_login_at,
    created_at,
    updated_at
FROM admin_users
WHERE is_active = TRUE;

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;