import jwt from 'jsonwebtoken';
import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'pesitm_cse_portal',
  password: process.env.DB_PASSWORD || 'admin123',
  port: process.env.DB_PORT || 5432,
});

const JWT_SECRET = process.env.JWT_SECRET || 'pesitm_cse_portal_secret_key_2024';

// Middleware to authenticate admin users
export const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if admin user exists and is active
    const query = 'SELECT id, username, email, full_name, role, is_active FROM admin_users WHERE id = $1 AND is_active = true';
    const result = await pool.query(query, [decoded.adminId]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or admin user not found'
      });
    }

    const admin = result.rows[0];

    // Check if token is still valid in sessions table
    const sessionQuery = `
      SELECT id FROM admin_sessions 
      WHERE admin_id = $1 AND token_hash = $2 AND expires_at > NOW() AND is_active = true
    `;
    const hashedToken = Buffer.from(token).toString('base64'); // Simple hash for demo
    const sessionResult = await pool.query(sessionQuery, [admin.id, hashedToken]);
    
    if (sessionResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Token expired or invalid session'
      });
    }

    // Add admin info to request object
    req.user = admin;
    req.tokenId = sessionResult.rows[0].id;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during authentication'
      });
    }
  }
};

// Middleware to check specific admin roles
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Middleware to check if user is super admin
export const requireSuperAdmin = requireRole(['super_admin']);

// Middleware to check if user is admin or super admin
export const requireAdmin = requireRole(['admin', 'super_admin']);

// Middleware to check if user has any admin role
export const requireAnyAdminRole = requireRole(['moderator', 'admin', 'super_admin']);