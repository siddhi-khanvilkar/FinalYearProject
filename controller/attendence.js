const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

// ✅ Controller to load students
exports.loadStudents = (req, res) => {
  const { month, year, working_days, class: selectedClass } = req.body;

  const sql = `
    SELECT student_id, student_name AS name, roll_no AS rollno, class 
    FROM students
    WHERE class = ?
  `;

  db.query(sql, [selectedClass], (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.send("No students found for the selected class.");
    }

    res.render("attendencetable", {
      students: results,
      month,
      year,
      working_days
    });
  });
};


exports.saveAttendance = (req, res) => {
  const { month, year, working_days, attendance, class: selectedClass } = req.body;

  if (!attendance || Object.keys(attendance).length === 0) {
    return res.status(400).send("No attendance data received.");
  }

  const attendanceData = Object.entries(attendance).map(
    ([student_id, present_days]) => [
      student_id,
      month,
      year,
      working_days,
      present_days
    ]
  );

  const sqlInsert = `
    INSERT INTO attendance (student_id, month, year, working_days, present_days)
    VALUES ?
    ON DUPLICATE KEY UPDATE
      working_days = VALUES(working_days),
      present_days = VALUES(present_days),
      created_at = CURRENT_TIMESTAMP
  `;

  db.query(sqlInsert, [attendanceData], (err) => {
    if (err) {
      console.error("Error saving attendance:", err);
      return res.status(500).send("Error saving attendance");
    }

    // Reload students to render attendance table with success message
    const sqlLoadStudents = `
      SELECT student_id, student_name AS name, roll_no AS rollno, class 
      FROM students
      WHERE class = ?
    `;

    db.query(sqlLoadStudents, [selectedClass], (err, results) => {
      if (err) {
        console.error("Error fetching students:", err);
        return res.status(500).send("Database error");
      }

      res.render("attendencetable", {
        students: results,
        month,
        year,
        working_days,
        message: "✅ Attendance saved successfully!"
      });
    });
  });
};

// ✅ Fetch attendance for a specific student (parent view)
// 

exports.viewAttendance = (req, res) => {
  const student_id = req.session && req.session.student_id;

  if (!student_id) {
    return res.status(400).send("Student ID is required");
  }

  const sql = `
    SELECT month, year, working_days, present_days, 
           CASE 
             WHEN working_days > 0 THEN ROUND((present_days / working_days) * 100, 2)
             ELSE 0
           END AS percentage
    FROM attendance
    WHERE student_id = ?
    ORDER BY year DESC, month DESC
  `;

  db.query(sql, [student_id], (err, results) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).send("Database error");
    }

    res.render("viewattendence", {
      attendance: results,
      student_id,
      message: results.length === 0 ? "No attendance records found." : null
    });
  });
};
