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

// Get all events with ordering
export const getAllEvents = async (req, res) => {
  try {
    const query = `
      SELECT * FROM events 
      WHERE status != 'deleted'
      ORDER BY display_order ASC, date DESC
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
      message: 'Error fetching events', 
      error: error.message 
    });
  }
};

// Get upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const query = `
      SELECT * FROM events 
      WHERE status = 'upcoming' AND date >= NOW()
      ORDER BY display_order ASC, date ASC
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
      message: 'Error fetching upcoming events', 
      error: error.message 
    });
  }
};

// Get featured events
export const getFeaturedEvents = async (req, res) => {
  try {
    const query = `
      SELECT * FROM events 
      WHERE is_featured = true AND status != 'deleted'
      ORDER BY display_order ASC, date DESC
      LIMIT 6
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
      message: 'Error fetching featured events', 
      error: error.message 
    });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const query = 'SELECT * FROM events WHERE id = $1 AND status != $2';
    const result = await pool.query(query, [req.params.id, 'deleted']);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching event', 
      error: error.message 
    });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      category,
      organizer,
      image_url,
      attendees,
      status,
      is_featured,
      display_order
    } = req.body;

    // Get the maximum display_order and increment it
    const maxOrderQuery = 'SELECT COALESCE(MAX(display_order), 0) as max_order FROM events';
    const maxOrderResult = await pool.query(maxOrderQuery);
    const nextOrder = display_order || (maxOrderResult.rows[0].max_order + 1);

    const query = `
      INSERT INTO events (
        title, description, date, venue, category, organizer, 
        image_url, attendees, status, is_featured, display_order, author_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    
    const values = [
      title,
      description,
      date,
      venue || null,
      category || 'workshop',
      organizer || null,
      image_url || null,
      attendees || 0,
      status || 'upcoming',
      is_featured || false,
      nextOrder,
      req.user?.id || 1  // Admin user ID from auth middleware
    ];

    const result = await pool.query(query, values);
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating event', 
      error: error.message 
    });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      date,
      venue,
      category,
      organizer,
      image_url,
      attendees,
      status,
      is_featured,
      display_order
    } = req.body;

    const query = `
      UPDATE events 
      SET title = $1, description = $2, date = $3, venue = $4, 
          category = $5, organizer = $6, image_url = $7, attendees = $8,
          status = $9, is_featured = $10, display_order = $11, updated_at = CURRENT_TIMESTAMP
      WHERE id = $12 AND status != 'deleted'
      RETURNING *
    `;

    const values = [
      title,
      description,
      date,
      venue,
      category,
      organizer,
      image_url,
      attendees,
      status,
      is_featured,
      display_order,
      id
    ];

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating event', 
      error: error.message 
    });
  }
};

// Delete event (soft delete)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE events 
      SET status = 'deleted', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND status != 'deleted'
      RETURNING id
    `;

    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting event', 
      error: error.message 
    });
  }
};

// Update event order
export const updateEventOrder = async (req, res) => {
  try {
    const { eventId, newOrder } = req.body;
    
    const query = `
      UPDATE events 
      SET display_order = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND status != 'deleted'
      RETURNING *
    `;

    const result = await pool.query(query, [newOrder, eventId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event order updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating event order', 
      error: error.message 
    });
  }
};

// Bulk update event orders
export const bulkUpdateEventOrder = async (req, res) => {
  try {
    const { events } = req.body; // Array of {id, display_order}
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      for (const event of events) {
        await client.query(
          'UPDATE events SET display_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          [event.display_order, event.id]
        );
      }
      
      await client.query('COMMIT');
      
      res.status(200).json({
        success: true,
        message: 'Event orders updated successfully'
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
      message: 'Error updating event orders', 
      error: error.message 
    });
  }
};

// Get events by category
export const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const query = `
      SELECT * FROM events 
      WHERE category = $1 AND status != 'deleted'
      ORDER BY display_order ASC, date DESC
    `;
    
    const result = await pool.query(query, [category]);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching events by category', 
      error: error.message 
    });
  }
};

// Search events
export const searchEvents = async (req, res) => {
  try {
    const { q } = req.query;
    
    const query = `
      SELECT * FROM events 
      WHERE (title ILIKE $1 OR description ILIKE $1) AND status != 'deleted'
      ORDER BY display_order ASC, date DESC
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
      message: 'Error searching events', 
      error: error.message 
    });
  }
};