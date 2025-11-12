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

// Get all research projects with ordering
export const getAllResearch = async (req, res) => {
  try {
    const query = `
      SELECT * FROM research 
      ORDER BY display_order ASC, created_at DESC
    `;
    const result = await pool.query(query);
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching research projects', 
      error: error.message 
    });
  }
};

// Get research by status
export const getResearchByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const query = `
      SELECT * FROM research 
      WHERE status = $1
      ORDER BY display_order ASC, created_at DESC
    `;
    
    const result = await pool.query(query, [status]);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching research by status', 
      error: error.message 
    });
  }
};

// Get research by area
export const getResearchByArea = async (req, res) => {
  try {
    const { area } = req.params;
    
    const query = `
      SELECT * FROM research 
      WHERE area ILIKE $1
      ORDER BY display_order ASC, created_at DESC
    `;
    
    const result = await pool.query(query, [`%${area}%`]);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching research by area', 
      error: error.message 
    });
  }
};

// Get single research project by ID
export const getResearchById = async (req, res) => {
  try {
    const query = 'SELECT * FROM research WHERE id = $1';
    const result = await pool.query(query, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Research project not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching research project', 
      error: error.message 
    });
  }
};

// Create new research project
export const createResearch = async (req, res) => {
  try {
    const {
      title,
      description,
      area,
      faculty_lead,
      funding_agency,
      funding_amount,
      start_date,
      end_date,
      status,
      publications,
      image_url,
      display_order
    } = req.body;

    // Get the maximum display_order and increment it
    const maxOrderQuery = 'SELECT COALESCE(MAX(display_order), 0) as max_order FROM research';
    const maxOrderResult = await pool.query(maxOrderQuery);
    const nextOrder = display_order || (maxOrderResult.rows[0].max_order + 1);

    const query = `
      INSERT INTO research (
        title, description, area, faculty_lead, funding_agency, 
        funding_amount, start_date, end_date, status, publications, 
        image_url, display_order, author_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    
    const values = [
      title,
      description,
      area || null,
      faculty_lead || null,
      funding_agency || null,
      funding_amount || null,
      start_date || null,
      end_date || null,
      status || 'ongoing',
      publications || null,
      image_url || null,
      nextOrder,
      req.user?.id || 1  // Admin user ID from auth middleware
    ];

    const result = await pool.query(query, values);
    
    res.status(201).json({
      success: true,
      message: 'Research project created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating research project', 
      error: error.message 
    });
  }
};

// Update research project
export const updateResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      area,
      faculty_lead,
      funding_agency,
      funding_amount,
      start_date,
      end_date,
      status,
      publications,
      image_url,
      display_order
    } = req.body;

    const query = `
      UPDATE research 
      SET title = $1, description = $2, area = $3, faculty_lead = $4, 
          funding_agency = $5, funding_amount = $6, start_date = $7, end_date = $8,
          status = $9, publications = $10, image_url = $11, display_order = $12,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $13
      RETURNING *
    `;

    const values = [
      title,
      description,
      area,
      faculty_lead,
      funding_agency,
      funding_amount,
      start_date,
      end_date,
      status,
      publications,
      image_url,
      display_order,
      id
    ];

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Research project not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Research project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating research project', 
      error: error.message 
    });
  }
};

// Delete research project
export const deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM research WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Research project not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Research project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting research project', 
      error: error.message 
    });
  }
};

// Update research order
export const updateResearchOrder = async (req, res) => {
  try {
    const { researchId, newOrder } = req.body;
    
    const query = `
      UPDATE research 
      SET display_order = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [newOrder, researchId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Research project not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Research order updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating research order', 
      error: error.message 
    });
  }
};

// Bulk update research orders
export const bulkUpdateResearchOrder = async (req, res) => {
  try {
    const { research } = req.body; // Array of {id, display_order}
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      for (const project of research) {
        await client.query(
          'UPDATE research SET display_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          [project.display_order, project.id]
        );
      }
      
      await client.query('COMMIT');
      
      res.status(200).json({
        success: true,
        message: 'Research orders updated successfully'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating research orders', 
      error: error.message 
    });
  }
};

// Search research projects
export const searchResearch = async (req, res) => {
  try {
    const { q } = req.query;
    
    const query = `
      SELECT * FROM research 
      WHERE (title ILIKE $1 OR description ILIKE $1 OR area ILIKE $1 OR faculty_lead ILIKE $1)
      ORDER BY display_order ASC, created_at DESC
    `;
    
    const result = await pool.query(query, [`%${q}%`]);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error searching research projects', 
      error: error.message 
    });
  }
};