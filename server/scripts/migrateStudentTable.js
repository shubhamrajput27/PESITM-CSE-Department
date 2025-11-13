import pool from '../config/database.js';

async function migrateStudentTable() {
  try {
    console.log('🔄 Starting student table migration...\n');

    // Backup existing data
    console.log('📦 Backing up existing student data...');
    const backupResult = await pool.query('SELECT * FROM students');
    const existingStudents = backupResult.rows;
    console.log(`✅ Backed up ${existingStudents.length} students\n`);

    // Drop the table
    console.log('🗑️  Dropping old students table...');
    await pool.query('DROP TABLE IF EXISTS student_sessions CASCADE');
    await pool.query('DROP TABLE IF EXISTS student_activity_log CASCADE');
    await pool.query('DROP TABLE IF EXISTS students CASCADE');
    console.log('✅ Old table dropped\n');

    // Recreate table with INTEGER id (not SERIAL)
    console.log('🔨 Creating new students table...');
    await pool.query(`
      CREATE TABLE students (
        id INTEGER PRIMARY KEY,
        student_id VARCHAR(20) UNIQUE NOT NULL,
        usn VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        department VARCHAR(50) DEFAULT 'CSE',
        semester INTEGER CHECK (semester >= 1 AND semester <= 8),
        year VARCHAR(10),
        phone VARCHAR(15),
        date_of_birth DATE,
        address TEXT,
        profile_image VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        last_login_at TIMESTAMP,
        failed_login_attempts INTEGER DEFAULT 0,
        locked_until TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ New table created\n');

    // Create indexes
    console.log('📑 Creating indexes...');
    await pool.query('CREATE INDEX idx_students_student_id ON students(student_id)');
    await pool.query('CREATE INDEX idx_students_usn ON students(usn)');
    await pool.query('CREATE INDEX idx_students_email ON students(email)');
    await pool.query('CREATE INDEX idx_students_active ON students(is_active)');
    await pool.query('CREATE INDEX idx_students_semester ON students(semester)');
    console.log('✅ Indexes created\n');

    // Recreate dependent tables
    console.log('🔨 Recreating dependent tables...');
    await pool.query(`
      CREATE TABLE student_sessions (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        ip_address INET,
        user_agent TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await pool.query(`
      CREATE TABLE student_activity_log (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        resource VARCHAR(100),
        resource_id INTEGER,
        ip_address INET,
        user_agent TEXT,
        details JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query('CREATE INDEX idx_student_sessions_student_id ON student_sessions(student_id)');
    await pool.query('CREATE INDEX idx_student_sessions_token_hash ON student_sessions(token_hash)');
    await pool.query('CREATE INDEX idx_student_activity_log_student_id ON student_activity_log(student_id)');
    console.log('✅ Dependent tables created\n');

    // Function to generate ID from USN
    const generateIdFromUSN = (usn) => {
      // Extract the number part from USN
      // For 4PM23CS067 -> extract 067 -> return 67
      // For 4PM23CS101 -> extract 101 -> return 101
      // For 4PM24CS403 -> extract 403 -> map to 127+ range
      
      const match = usn.match(/4PM(\d{2})CS(\d+)/);
      if (!match) return null;
      
      const year = match[1]; // 23 or 24
      const number = parseInt(match[2]); // 001, 067, 101, 403, etc.
      
      if (year === '23') {
        // 2023 batch: use the number directly
        return number;
      } else if (year === '24') {
        // 2024 batch: start from 127
        // 403 -> 127, 404 -> 128, etc.
        return 127 + (number - 403);
      }
      
      return null;
    };

    // Restore data with new IDs
    if (existingStudents.length > 0) {
      console.log('♻️  Restoring student data with new IDs...');
      for (const student of existingStudents) {
        const newId = generateIdFromUSN(student.usn);
        if (newId) {
          await pool.query(`
            INSERT INTO students (
              id, student_id, usn, email, password_hash, full_name,
              department, semester, year, phone, date_of_birth, address,
              profile_image, is_active, last_login_at, failed_login_attempts,
              locked_until, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            ON CONFLICT (id) DO NOTHING
          `, [
            newId, student.student_id, student.usn, student.email, student.password_hash,
            student.full_name, student.department, student.semester, student.year,
            student.phone, student.date_of_birth, student.address, student.profile_image,
            student.is_active, student.last_login_at, student.failed_login_attempts,
            student.locked_until, student.created_at, student.updated_at
          ]);
          console.log(`✅ Restored: ${student.full_name} (USN: ${student.usn}, ID: ${newId})`);
        }
      }
    }

    console.log('\n✅ Migration completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Students migrated: ${existingStudents.length}`);
    console.log('   - ID generation logic:');
    console.log('     • 4PM23CS001-126 → ID: 1-126');
    console.log('     • 4PM24CS403-411 → ID: 127-135');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

// Run migration
migrateStudentTable();
