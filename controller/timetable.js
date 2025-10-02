const path = require('path');
const fs = require('fs');
const db = require('../db');

// Upload timetable
// exports.uploadTimetable = (req, res) => {
//     const { class: className, date } = req.body;
//     const timetablePDF = req.file;

//     if (!timetablePDF) {
//         return res.status(400).send('No file uploaded.');
//     }

//     // Ensure upload directory exists
//     const uploadDir = path.join(__dirname, '../public/uploads/timetables');
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Unique filename
//     const fileName = `${className}_${date}_${Date.now()}_${timetablePDF.originalname}`;
//     const filePath = path.join(uploadDir, fileName);

//     // Save PDF to disk
//     fs.writeFileSync(filePath, timetablePDF.buffer);

//     // Save in DB
//     const sql = `INSERT INTO timetables (class, date, filename) VALUES (?, ?, ?)`;
//     const values = [className, date, fileName];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Database insert error:', err);
//             return res.status(500).send('Error saving timetable to database.');
//         }

//         console.log('Timetable saved to database with ID:', result.insertId);
//         res.send('Timetable uploaded and saved successfully.');
//     });
// };
// exports.uploadTimetable = (req, res) => {
//     const { className } = req.body; // from form dropdown
//     const timetablePDF = req.file;

//     if (!timetablePDF) {
//         return res.status(400).send("No file uploaded.");
//     }

//     const sql = "INSERT INTO timetable (class, filename) VALUES (?, ?)";
//     db.query(sql, [className, timetablePDF.originalname], (err) => {
//         if (err) {
//             console.error("Error saving timetable:", err);
//             return res.status(500).send("Error saving timetable");
//         }
//         res.redirect("/viewtimetable");
//     });
// };


//View timetable
// exports.viewTimetable = (req, res) => {
//     const studentId = req.session.student_id;

//     if (!studentId) {
//         return res.status(401).send("Unauthorized. Please log in.");
//     }

//     // Step 1: Get student's class
//     const getClassQuery = `SELECT class FROM students WHERE student_id = ?`;

//     db.query(getClassQuery, [studentId], (err, results) => {
//         if (err) {
//             console.error("Error fetching class for student:", err);
//             return res.status(500).send("Internal server error.");
//         }

//         if (results.length === 0) {
//             return res.status(404).send("Student not found.");
//         }

//         const studentClass = results[0].class;

//         // Step 2: Get latest timetable for that class
//         const getTimetableQuery = `
//             SELECT class, date, filename
//             FROM timetables
//             WHERE class = ?
//             ORDER BY date DESC
//             LIMIT 1
//         `;

//         db.query(getTimetableQuery, [studentClass], (err, timetables) => {
//             if (err) {
//                 console.error("Error fetching timetable:", err);
//                 return res.status(500).send("Failed to load timetable.");
//             }

//             let timetable = null;
//             if (timetables.length > 0) {
//                 timetable = {
//                     ...timetables[0],
//                     fileUrl: `/uploads/timetables/${timetables[0].filename}`
//                 };
//             }

//             res.render("viewtimetable", {
//                 studentClass,
//                 timetable
//             });
//         });
//     });
// };
// exports.viewTimetable = (req, res) => {
//     const studentClass = req.session.student_class;

//     if (!studentClass) {
//         return res.status(403).send("Unauthorized: No class info in session");
//     }

//     const sql = "SELECT * FROM timetables WHERE class = ?";
//     db.query(sql, [studentClass], (err, results) => {
//         if (err) {
//             console.error("Error fetching timetable:", err);
//             return res.status(500).send("Error loading timetable");
//         }

//         res.render("viewtimetable", { 
//             timetable: results, 
//             studentClass 
//         });
//     });
// };

// Upload timetable (teacher side)
// Upload timetable
// exports.uploadTimetable = (req, res) => {
//     const { className } = req.body; // from form dropdown
//     const timetablePDF = req.file;

//     if (!timetablePDF) {
//         return res.status(400).send("No file uploaded.");
//     }

//     const sql = "INSERT INTO timetables (class, filename) VALUES (?, ?)";
//     db.query(sql, [className, timetablePDF.originalname], (err) => {
//         if (err) {
//             console.error("Error saving timetable:", err);
//             return res.status(500).send("Error saving timetable");
//         }
//         res.redirect("/viewtimetable");
//     });
// };

// // View timetable
// exports.viewTimetable = (req, res) => {
//     const studentClass = req.session.student_class;

//     if (!studentClass) {
//         return res.status(403).send("Unauthorized: No class info in session");
//     }

//     const sql = "SELECT * FROM timetables WHERE class = ?";
//     db.query(sql, [studentClass], (err, results) => {
//         if (err) {
//             console.error("Error fetching timetable:", err);
//             return res.status(500).send("Error loading timetable");
//         }

//         res.render("viewtimetable", { 
//             timetable: results, 
//             studentClass 
//         });
//     });
// };
// const path = require("path");
// const db = require("../db");

// exports.uploadTimetable = (req, res) => {
//     const { class: className } = req.body; // matches <select name="class">
//     const timetablePDF = req.file;

//     if (!timetablePDF) {
//         return res.status(400).send("No file uploaded.");
//     }

//     const sql = "INSERT INTO timetables (class, filename) VALUES (?, ?)";
//     db.query(sql, [className, timetablePDF.originalname], (err) => {
//         if (err) {
//             console.error("Error saving timetable:", err);
//             return res.status(500).send("Error saving timetable");
//         }
//         res.redirect("/viewtimetable");
//     });
// };

// exports.viewTimetable = (req, res) => {
//     const studentClass = req.session.student_class;

//     if (!studentClass) {
//         console.error("No class info in session!");
//         return res.status(403).send("Unauthorized: No class info in session");
//     }

//     console.log("Fetching timetable for class:", studentClass);

//     const sql = "SELECT * FROM timetables WHERE class = ?";
//     db.query(sql, [studentClass], (err, results) => {
//         if (err) {
//             console.error("Error fetching timetable:", err);
//             return res.status(500).send("Error loading timetable");
//         }

//         res.render("viewtimetable", { 
//             timetable: results, 
//             studentClass 
//         });
//     });
// };
//  exports.uploadTimetable = (req, res) => {
//     const { className } = req.body; // from form dropdown
//     const timetablePDF = req.file;

//     if (!timetablePDF) {
//         return res.status(400).send("No file uploaded.");
//     }

//     const sql = "INSERT INTO timetable (class, filename) VALUES (?, ?)";
//     db.query(sql, [className, timetablePDF.originalname], (err) => {
//         if (err) {
//             console.error("Error saving timetable:", err);
//             return res.status(500).send("Error saving timetable");
//         }
//         res.redirect("/viewtimetable");
//     });
// };
// exports.uploadTimetable = (req, res) => {
//     if (!req.file) {
//         return res.status(400).send("No file uploaded.");
//     }

//     const filename = req.file.originalname;
//     let studentClass = req.body.class || req.session.teacher_class;  // ✅ take from dropdown if provided

//     if (!studentClass) {
//         return res.status(400).send("Class is required.");
//     }

//     const sql = "INSERT INTO timetables (class, filename) VALUES (?, ?)";
//     db.query(sql, [studentClass, filename], (err) => {
//         if (err) {
//             console.error("❌ SQL Error:", err);   // full error
//             return res.status(500).send("Error saving timetable");
//         }
//         console.log("✅ Timetable uploaded:", { studentClass, filename });
//         res.redirect("/viewtimetable");
//     });
// };
// exports.uploadTimetable = (req, res) => {
//   const { class: studentClass, date } = req.body;
//   const timetablePDF = req.file;

//   console.log("📝 Body:", req.body);
//   console.log("📂 File:", req.file);

//   if (!studentClass || !timetablePDF || !date) {
//     return res.status(400).send("Class, date, and timetable file are required.");
//   }

//   const filename = Date.now() + "_" + timetablePDF.originalname;

//   db.query(
//     "INSERT INTO timetables (class, date, filename) VALUES (?, ?, ?)",
//     [studentClass, date, filename],
//     (err) => {
//       if (err) {
//         console.error("Error saving timetable:", err);
//         return res.status(500).send("Error saving timetable");
//       }
//       console.log("✅ Timetable uploaded:", { studentClass, date, filename });
//       return res.render("teacherDashboard", { message: "Timetable uploaded successfully" });
//     }
//   );
// };
// exports.uploadTimetable = (req, res) => {
//   const { studentClass, date } = req.body;
//   const timetablePDF = req.file;

//   console.log("📝 Body:", req.body);
//   console.log("📂 File:", req.file);

//   if (!studentClass || !timetablePDF || !date) {
//     return res.status(400).send("Class, date, and timetable file are required.");
//   }

//   // Since memoryStorage has no .filename, generate one
//   const filename = Date.now() + "_" + timetablePDF.originalname;

//   db.query(
//     "INSERT INTO timetables (class, date, filename) VALUES (?, ?, ?)",
//     [studentClass, date, filename],
//     (err) => {
//       if (err) {
//         console.error("Error saving timetable:", err);
//         return res.status(500).send("Error saving timetable");
//       }
//       console.log("✅ Timetable uploaded:", { studentClass, date, filename });
//       return res.render("teacherDashboard", { message: "Timetable uploaded successfully" });
//     }
//   );
// };

//working one
// exports.uploadTimetable = (req, res) => {
//   const { studentClass, date } = req.body;
//   const timetablePDF = req.file;

//   if (!studentClass || !timetablePDF || !date) {
//     return res.status(400).send("Class, date, and timetable file are required.");
//   }

//   const filename = Date.now() + "_" + timetablePDF.originalname;

//   db.query(
//     "INSERT INTO timetables (class, date, filename) VALUES (?, ?, ?)",
//     [studentClass, date, filename],
//     (err) => {
//       if (err) {
//         console.error("Error saving timetable:", err);
//         return res.status(500).send("Error saving timetable");
//       }

//       console.log("✅ Timetable uploaded:", { studentClass, date, filename });
//       // ✅ Render teacherDashboard with a success message
//       return res.render("teacherDashboard", {
//         message: `✅ Timetable for ${studentClass} uploaded successfully on ${date}.`
//       });
//     }
//   );
// };

//try 

exports.uploadTimetable = (req, res) => {
  const { studentClass, date } = req.body;
  const timetablePDF = req.file;

  if (!studentClass || !timetablePDF || !date) {
    return res.status(400).send("Class, date, and timetable file are required.");
  }

  const filename = Date.now() + "_" + timetablePDF.originalname;

  db.query(
    "INSERT INTO timetables (class, date, filename, file_data) VALUES (?, ?, ?, ?)",
    [studentClass, date, filename, timetablePDF.buffer],
    (err) => {
      if (err) {
        console.error("Error saving timetable:", err);
        return res.status(500).send("Error saving timetable");
      }

      console.log("✅ Timetable uploaded:", { studentClass, date, filename });
      return res.render("teacherDashboard", {
        message: `✅ Timetable for ${studentClass} uploaded successfully on ${date}.`
      });
    }
  );
};


// exports.viewTimetable = (req, res) => {
//     const studentClass = req.session.student_class;

//     if (!studentClass) {
//         return res.status(403).send("Unauthorized: No class info in session");
//     }

//     const sql = "SELECT * FROM timetable WHERE class = ?";
//     db.query(sql, [studentClass], (err, results) => {
//         if (err) {
//             console.error("Error fetching timetable:", err);
//             return res.status(500).send("Error loading timetable");
//         }

//         res.render("viewtimetable", { 
//             timetable: results, 
//             studentClass 
//         });
//     });
// };
// exports.viewTimetable = (req, res) => {
//   const studentClass = req.session.studentClass;

//   if (!studentClass) {
//     return res.status(401).send("Unauthorized: No class info in session");
//   }

//   db.query(
//     "SELECT * FROM timetables WHERE class = ? ORDER BY created_at DESC LIMIT 1",
//     [studentClass],
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching timetable:", err);
//         return res.status(500).send("Error fetching timetable");
//       }

//       if (results.length === 0) {
//         return res.render("viewTimetable", { message: "No timetable found for your class" });
//       }

//       return res.render("viewTimetable", { timetable: results[0] });
//     }
//   );
// };
// exports.viewTimetable = (req, res) => {
//   const studentClass = req.session.studentClass;

//   if (!studentClass) {
//     return res.status(401).send("Unauthorized: No class info in session");
//   }

//   db.query(
//     "SELECT * FROM timetables WHERE class = ? ORDER BY created_at DESC LIMIT 1",
//     [studentClass],
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching timetable:", err);
//         return res.status(500).send("Error fetching timetable");
//       }

//       if (results.length === 0) {
//         return res.render("viewTimetable", { message: "No timetable found for your class" });
//       }

//       return res.render("viewTimetable", { timetable: results[0] });
//     }
//   );
// };
exports.viewTimetable = (req, res) => {
  const studentClass = req.session.studentClass;

  if (!studentClass) {
    return res.status(401).send("Unauthorized: No class info in session");
  }

  console.log("👀 Viewing timetable for class:", studentClass);

  db.query(
    "SELECT * FROM timetables WHERE class = ? ORDER BY created_at DESC LIMIT 1",
    [studentClass],
    (err, results) => {
      if (err) {
        console.error("Error fetching timetable:", err);
        return res.status(500).send("Error fetching timetable");
      }

      if (results.length === 0) {
        return res.render("viewTimetable", { message: "No timetable uploaded for this class yet." });
      }

      return res.render("viewTimetable", { timetable: results[0] });
    }
  );
};

exports.getTimetableFile = (req, res) => {
  const { filename } = req.params;

  db.query(
    "SELECT file_data FROM timetables WHERE filename = ?",
    [filename],
    (err, results) => {
      if (err) {
        console.error("Error fetching timetable file:", err);
        return res.status(500).send("Error fetching timetable file");
      }

      if (results.length === 0) {
        return res.status(404).send("File not found");
      }

      res.setHeader("Content-Type", "application/pdf");
      res.send(results[0].file_data);
    }
  );
};
