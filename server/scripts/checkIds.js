import pool from '../config/database.js';

async function checkIds() {
  try {
    console.log('🔍 Checking student IDs in database...\n');
    
    // Check all students with their IDs
    const result = await pool.query(`
      SELECT id, usn, full_name 
      FROM students 
      WHERE usn LIKE '4PM24%' 
      ORDER BY id
    `);
    
    console.log('📋 Students with 4PM24 USNs:');
    console.log('================================');
    console.log('ID | USN | Name');
    console.log('================================');
    
    result.rows.forEach(row => {
      console.log(`${row.id} | ${row.usn} | ${row.full_name}`);
    });
    
    console.log('\n📊 Summary:');
    console.log(`   Total 4PM24 students: ${result.rows.length}`);
    
    // Check what IDs are being used
    const allIds = await pool.query(`
      SELECT id, usn 
      FROM students 
      WHERE id >= 120 
      ORDER BY id
    `);
    
    console.log('\n📋 IDs from 120 onwards:');
    console.log('================================');
    allIds.rows.forEach(row => {
      console.log(`${row.id} | ${row.usn}`);
    });
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkIds();
