import pool from '../config/database.js';

async function checkLoginData() {
  try {
    console.log('🔍 Checking Login Data...\n');
    
    // Check admin users
    const adminResult = await pool.query(`
      SELECT id, username, email, full_name, role, is_active 
      FROM admin_users 
      ORDER BY id
    `);
    
    console.log('👨‍💼 Admin Users:');
    console.log('================================');
    if (adminResult.rows.length === 0) {
      console.log('❌ No admin users found!');
    } else {
      adminResult.rows.forEach(admin => {
        console.log(`Username: ${admin.username}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Name: ${admin.full_name}`);
        console.log(`Role: ${admin.role}`);
        console.log(`Active: ${admin.is_active}`);
        console.log('--------------------------------');
      });
    }
    
    // Check faculty users
    const facultyResult = await pool.query(`
      SELECT id, faculty_id, email, full_name, designation, is_active 
      FROM faculty_users 
      ORDER BY id
      LIMIT 3
    `);
    
    console.log('\n👨‍🏫 Faculty Users (Sample):');
    console.log('================================');
    if (facultyResult.rows.length === 0) {
      console.log('❌ No faculty users found!');
    } else {
      facultyResult.rows.forEach(faculty => {
        console.log(`Faculty ID: ${faculty.faculty_id}`);
        console.log(`Email: ${faculty.email}`);
        console.log(`Name: ${faculty.full_name}`);
        console.log(`Designation: ${faculty.designation}`);
        console.log(`Active: ${faculty.is_active}`);
        console.log('--------------------------------');
      });
    }
    
    // Check students
    const studentResult = await pool.query(`
      SELECT id, usn, student_id, email, full_name, semester, is_active 
      FROM students 
      ORDER BY id
      LIMIT 3
    `);
    
    console.log('\n👨‍🎓 Students (Sample):');
    console.log('================================');
    if (studentResult.rows.length === 0) {
      console.log('❌ No students found!');
    } else {
      studentResult.rows.forEach(student => {
        console.log(`USN: ${student.usn}`);
        console.log(`Student ID: ${student.student_id}`);
        console.log(`Email: ${student.email}`);
        console.log(`Name: ${student.full_name}`);
        console.log(`Semester: ${student.semester}`);
        console.log(`Active: ${student.is_active}`);
        console.log('--------------------------------');
      });
    }
    
    console.log('\n📝 Login Credentials Summary:');
    console.log('================================');
    console.log(`Admin Users: ${adminResult.rows.length}`);
    console.log(`Faculty Users: ${facultyResult.rowCount}`);
    console.log(`Students: ${studentResult.rowCount}`);
    
    console.log('\n🔐 Test Credentials:');
    console.log('================================');
    if (adminResult.rows.length > 0) {
      console.log('Admin Login:');
      console.log(`  Username: ${adminResult.rows[0].username}`);
      console.log(`  Password: admin123 (default)`);
    }
    console.log('\nFaculty Login:');
    console.log('  Faculty ID: FAC001');
    console.log('  Password: faculty123 (default)');
    console.log('\nStudent Login:');
    console.log('  USN: 4PM23CS001');
    console.log('  Password: student123 (default)');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkLoginData();
