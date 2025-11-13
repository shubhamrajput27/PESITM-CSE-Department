import pool from '../config/database.js';
import bcrypt from 'bcrypt';

// Actual student data from 5th Semester A Section
const studentsData = [
  { usn: '4PM23CS001', name: 'ADARSH UMESH HEGDE' },
  { usn: '4PM23CS002', name: 'ADITYA KUMAR' },
  { usn: '4PM23CS003', name: 'AHMED SHAREEF' },
  { usn: '4PM23CS004', name: 'AISHWARYA K R' },
  { usn: '4PM23CS005', name: 'AISHWARYA LAXMI' },
  { usn: '4PM23CS006', name: 'AKASH' },
  { usn: '4PM23CS007', name: 'ALOK HAVANAGI' },
  { usn: '4PM23CS008', name: 'AMRUTHA R H' },
  { usn: '4PM23CS009', name: 'ANAND HOLI' },
  { usn: '4PM23CS010', name: 'ANANYA K JOIS' },
  { usn: '4PM23CS011', name: 'ANISH M' },
  { usn: '4PM23CS012', name: 'ANKITHA B' },
  { usn: '4PM23CS013', name: 'ANKITHA C' },
  { usn: '4PM23CS014', name: 'ANKITHA N B' },
  { usn: '4PM23CS015', name: 'ANUSHA H M' },
  { usn: '4PM23CS016', name: 'B M BHARATH KUMAR' },
  { usn: '4PM23CS017', name: 'BHARGAVI S R' },
  { usn: '4PM23CS018', name: 'BHAVYA G S' },
  { usn: '4PM23CS019', name: 'CHANDANA B' },
  { usn: '4PM23CS020', name: 'CHANDRAPPA IRAPPA BANNIHATTI' },
  { usn: '4PM23CS021', name: 'CHETAN R J' },
  { usn: '4PM23CS022', name: 'CHETAN SATYEPPA MAGADUM' },
  { usn: '4PM23CS023', name: 'CHINMAY S R' },
  { usn: '4PM23CS024', name: 'D R VIJAY' },
  { usn: '4PM23CS025', name: 'DASARI KEERTHAN DATTA' },
  { usn: '4PM23CS026', name: 'DEEKSHA J R' },
  { usn: '4PM23CS027', name: 'DHANYA P TIMALAPUR' },
  { usn: '4PM23CS028', name: 'DHRUVA PATEL H' },
  { usn: '4PM23CS029', name: 'DIVYA S K' },
  { usn: '4PM23CS030', name: 'DUTHI S M' },
  { usn: '4PM23CS031', name: 'G VARUN RAJU' },
  { usn: '4PM23CS032', name: 'GAGAN R BANGER' },
  { usn: '4PM23CS033', name: 'GAGANA J' },
  { usn: '4PM23CS034', name: 'GORAKATI CHAITANYA REDDY' },
  { usn: '4PM23CS035', name: 'GOWTHAM K' },
  { usn: '4PM23CS036', name: 'H GANESH' },
  { usn: '4PM23CS037', name: 'H N SPANDAN GOWDA' },
  { usn: '4PM23CS038', name: 'HARSHA D P' },
  { usn: '4PM23CS039', name: 'HARSHITHA B R' },
  { usn: '4PM23CS041', name: 'IMMANVEL J ABNES' },
  { usn: '4PM23CS042', name: 'IMRAN BAIG' },
  { usn: '4PM23CS043', name: 'JAYASURYA V' },
  { usn: '4PM23CS044', name: 'JEEVANA KRISHNAMOORTI NAIK' },
  { usn: '4PM23CS045', name: 'JYOTI ASHOK HINDI' },
  { usn: '4PM23CS046', name: 'K C ASHWINI' },
  { usn: '4PM23CS047', name: 'K N NANDITHA' },
  { usn: '4PM23CS048', name: 'KAVANA A' },
  { usn: '4PM23CS049', name: 'KONA VENKATA SRUJANA SREE' },
  { usn: '4PM23CS050', name: 'LIKITH S' },
  { usn: '4PM23CS051', name: 'LIKHITH GOWDA K N' },
  { usn: '4PM23CS052', name: 'LINGANAGOUDA SHADAKSHAR AGOUDA PATIL' },
  { usn: '4PM23CS053', name: 'M C BINDU RANI' },
  { usn: '4PM23CS054', name: 'MAHANTESHA U' },
  { usn: '4PM23CS055', name: 'MAHERA MUSKAN' },
  { usn: '4PM23CS056', name: 'MANASA M P' },
  { usn: '4PM23CS057', name: 'MANASA N C' },
  { usn: '4PM23CS058', name: 'MANDARA G N' },
  { usn: '4PM23CS059', name: 'MANSI H J' },
  { usn: '4PM23CS061', name: 'MD ZULKERNAIN KHAN' },
  { usn: '4PM23CS062', name: 'MOHAMMED MAAZ F' },
  { usn: '4PM23CS063', name: 'MOHAMMED SAIF KATTIMANI' },
  { usn: '4PM23CS064', name: 'MUBARAK KHAN' },
  { usn: '4PM23CS065', name: 'NANDAN S P' },
  { usn: '4PM23CS066', name: 'NANDINI HOSAMANI' },
  { usn: '4PM24CS400', name: 'A R VAISHNAVI' },
  { usn: '4PM24CS401', name: 'BHUVAN S' },
  { usn: '4PM24CS402', name: 'CHETHAN K C' }
];

async function updateStudentsA() {
  try {
    console.log('🔄 Starting students update for 5th Semester A Section...\n');

    // Default password for all students (they should change it after first login)
    const defaultPassword = 'student123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    let updatedCount = 0;
    let createdCount = 0;

    for (const student of studentsData) {
      const { usn, name } = student;
      
      // Generate student_id and email based on USN
      const student_id = usn.replace('4PM', '2023CSE');
      const email = `${usn.toLowerCase()}@pestrust.edu.in`;

      // Check if student already exists
      const checkQuery = 'SELECT * FROM students WHERE usn = $1';
      const checkResult = await pool.query(checkQuery, [usn]);

      if (checkResult.rows.length > 0) {
        // Update existing student
        const updateQuery = `
          UPDATE students 
          SET email = $1, 
              full_name = $2, 
              semester = $3,
              year = $4,
              department = $5,
              updated_at = CURRENT_TIMESTAMP
          WHERE usn = $6
        `;
        await pool.query(updateQuery, [email, name, 5, '3rd Year', 'CSE', usn]);
        updatedCount++;
        console.log(`✅ Updated: ${name} (${usn})`);
      } else {
        // Insert new student
        const insertQuery = `
          INSERT INTO students 
          (student_id, usn, email, password_hash, full_name, semester, year, department) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        await pool.query(insertQuery, [student_id, usn, email, hashedPassword, name, 5, '3rd Year', 'CSE']);
        createdCount++;
        console.log(`✨ Created: ${name} (${usn})`);
      }
    }

    console.log('\n✅ Students update completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Total Students: ${studentsData.length}`);
    console.log(`   - Created: ${createdCount}`);
    console.log(`   - Updated: ${updatedCount}`);
    console.log('\n📝 Student Login Information:');
    console.log('================================');
    console.log('Semester: 5th | Section: A');
    console.log('Default Password for all: student123');
    console.log('Email Format: usn@pestrust.edu.in');
    console.log('\nExample Login:');
    console.log('USN: 4PM23CS001');
    console.log('Password: student123');
    console.log('--------------------------------');
    console.log('\n⚠️  IMPORTANT: Students should change their passwords after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating students:', error);
    process.exit(1);
  }
}

// Run the update
updateStudentsA();
