const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


// exports.register = (req, res) => {
//     console.log("Register request received:", req.body);

//     const username = req.body.username;
//     const student_id = req.body.student_id;
//     const student_rollno = req.body.student_rollno;
//     const pass = req.body.pass;
//     const cpass = req.body.cpass;

//     db.query("SELECT student_id FROM students WHERE student_id = ?", [student_id], (error, studentResults) => {
//         if (error) {
//             console.log("Error querying student:", error);
//             return res.render("register", {
//                 message: "Database error checking student ID"
//             });
//         }

//         if (!studentResults || studentResults.length === 0) {
//             console.log ("Student ID not found in DB.");
//             return res.render("register", {
//                 message: "Invalid Student ID. Student not found."
//             });
//         }

//         console.log("Student exists. Checking if parent already registered.");

//         db.query("SELECT * FROM parents p JOIN student_parent sp ON p.parent_id = sp.parent_id WHERE sp.student_id = ?", [student_id], async (error, results) => {
//             if (error) {
//                 console.log("Error checking parent existence:", error);
//                 return res.render("register", {
//                     message: "Error checking parent data"
//                 });
//             }

//             if (results && results.length > 0) {
//                 console.log("Parent already registered for this student.");
//                 return res.render("register", {
//                     message: "A parent for this Student ID is already registered"
//                 });
//             } else if (pass !== cpass) {
//                 console.log("Password mismatch.");
//                 return res.render("register", {
//                     message: "Passwords do not Match"
//                 });
//             }

//             console.log("Registering new parent...");
//             let hashedPassword = await bcrypt.hash(pass, 8);
//             console.log("Hashed Password:", hashedPassword);

//             db.query("INSERT INTO parents SET ?", { name: username, email: username + "@mail.com", password: hashedPassword }, (error, parentResults) => {
//                 if (error) {
//                     console.log("Error inserting into parents:", error);
//                     return res.render("register", {
//                         message: "Error registering parent"
//                     });
//                 }

//                 const parentId = parentResults.insertId;
//                 console.log("Inserted parent with ID:", parentId);

//                 db.query("INSERT INTO student_parent SET ?", { student_id: student_id, parent_id: parentId }, (err2) => {
//                     if (err2) {
//                         console.log("Error linking parent to student:", err2);
//                         return res.render("register", {
//                             message: "Error linking parent to student"
//                         });
//                     }

//                     console.log("Parent registered successfully!");
//                     return res.render("register", {
//                         message: "Parent Registered Successfully"
//                     });
//                 });
//             });
//         });
//     });
// };


// exports.login = async (req, res) => {
//     const student_id = req.body.student_id;
//     const pass = req.body.pass;

//     console.log("Login attempt for student ID:", student_id);

//     // Step 1: Find parent linked to the student
//     db.query(
//         `SELECT p.* 
//          FROM parents p 
//          JOIN student_parent sp ON p.parent_id = sp.parent_id 
//          WHERE sp.student_id = ?`,
//         [student_id],
//         async (error, results) => {
//             if (error) {
//                 console.error("DB error:", error);
//                 return res.render("login", {
//                     message: "Server error during login"
//                 });
//             }

//             if (results.length === 0) {
//                 console.log("No parent linked to this student ID");
//                 return res.render("login", {
//                     message: "Parent is not registered"
//                 });
//             }

//             const parent = results[0];
//             const hashedPassword = parent.password;

//             // Step 2: Compare entered password with hashed password
//             const isMatch = await bcrypt.compare(pass, hashedPassword);

//             if (!isMatch) {
//                 return res.render("login", {
//                     message: "Incorrect Password"
//                 });
//             }

//             // ✅ Step 3: Store student_id in session
//             req.session.student_id = student_id;
//             console.log("Logged in. Session student_id:", req.session.student_id);

//             // ✅ Step 4: Render profile with session support
//             return res.render("profile", {
//                 parentName: parent.name
//                 // student_id is now in session, no need to pass it
//             });
//         }
//     );
// };
// login controller
// exports.login = async (req, res) => {
//     const student_id = req.body.student_id;
//     const pass = req.body.pass;

//     console.log("Login attempt for student ID:", student_id);

//     db.query(
//         `SELECT p.*, s.class, s.student_name, s.roll_no
//          FROM parents p 
//          JOIN student_parent sp ON p.parent_id = sp.parent_id 
//          JOIN students s ON sp.student_id = s.student_id
//          WHERE sp.student_id = ?`,
//         [student_id],
//         async (error, results) => {
//             if (error) {
//                 console.error("DB error:", error);
//                 return res.render("login", { message: "Server error during login" });
//             }

//             if (results.length === 0) {
//                 console.log("No parent linked to this student ID");
//                 return res.render("login", { message: "Parent is not registered" });
//             }

//             const parent = results[0];
//             const hashedPassword = parent.password;

//             const isMatch = await bcrypt.compare(pass, hashedPassword);
//             if (!isMatch) {
//                 return res.render("login", { message: "Incorrect Password" });
//             }

//             // ✅ Store student info in session
//             req.session.student_id = student_id;
//             req.session.student_class = parent.class;
//             req.session.student_name = parent.student_name;
//             req.session.roll_no = parent.roll_no;

//             console.log("Logged in -> session:", {
//                 id: req.session.student_id,
//                 name: req.session.student_name,
//                 roll: req.session.roll_no,
//                 class: req.session.student_class
//             });

//             return res.render("profile", {
//                 parentName: parent.name, // from parents table
//                 student_id,
//                 student_name: parent.student_name, // fixed
//                 roll_no: parent.roll_no,
//                 student_class: parent.class
//             });
//         }
//     );
// };const bcrypt = require("bcryptjs");


// exports.login = async (req, res) => {
//     const student_id = req.body.student_id;
//     const pass = req.body.pass;

//     console.log("Login attempt for student ID:", student_id);

//     db.query(
//         `SELECT p.*, s.class, s.student_name, s.roll_no
//          FROM parents p 
//          JOIN student_parent sp ON p.parent_id = sp.parent_id 
//          JOIN students s ON sp.student_id = s.student_id
//          WHERE sp.student_id = ?`,
//         [student_id],
//         async (error, results) => {
//             if (error) {
//                 console.error("DB error:", error);
//                 return res.render("login", { message: "Server error during login" });
//             }

//             if (results.length === 0) {
//                 console.log("No parent linked to this student ID");
//                 return res.render("login", { message: "Parent is not registered" });
//             }

//             const parent = results[0];
//             const hashedPassword = parent.password;

//             const isMatch = await bcrypt.compare(pass, hashedPassword);
//             if (!isMatch) {
//                 return res.render("login", { message: "Incorrect Password" });
//             }

//             // ✅ Store student + parent info in session
//             req.session.student_id = student_id;
//             req.session.student_class = parent.class;
//             req.session.student_name = parent.student_name;
//             req.session.roll_no = parent.roll_no;
//             req.session.parentName = parent.name;

//             console.log("Session after login:", req.session);

//             // redirect instead of render
//             return res.redirect("/profile");
//         }
//     );
// };



// ==================== TEACHER LOGIN ====================
// exports.teacherlogin = (req, res) => {
//     const { username, password } = req.body;

//     db.query("SELECT * FROM teacher WHERE username = ? AND password = ?", 
//         [username, password], 
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.render("teacherlogin", { message: "Server error" });
//             }

//             if (results.length > 0) {
//                 return res.render("teacherDashboard", { message: "Welcome Teacher!" });
//             } else {
//                 return res.render("teacherlogin", { message: "Invalid Username or Password" });
//             }
//         }
//     );
// };
// const mysql = require("mysql");
// const bcrypt = require("bcryptjs");

// // DB connection
// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME
// });

// ================= REGISTER =================
// exports.register = (req, res) => {
//   const { username, student_id, student_rollno, pass, cpass } = req.body;

//   db.query("SELECT student_id FROM students WHERE student_id = ?", [student_id], (error, studentResults) => {
//     if (error) {
//       return res.render("register", { message: "Database error checking student ID" });
//     }

//     if (!studentResults || studentResults.length === 0) {
//       return res.render("register", { message: "Invalid Student ID. Student not found." });
//     }

//     db.query("SELECT * FROM parents p JOIN student_parent sp ON p.parent_id = sp.parent_id WHERE sp.student_id = ?", [student_id], async (error, results) => {
//       if (error) {
//         return res.render("register", { message: "Error checking parent data" });
//       }

//       if (results && results.length > 0) {
//         return res.render("register", { message: "A parent for this Student ID is already registered" });
//       } else if (pass !== cpass) {
//         return res.render("register", { message: "Passwords do not match" });
//       }

//       let hashedPassword = await bcrypt.hash(pass, 8);

//       db.query("INSERT INTO parents SET ?", { name: username, email: username + "@mail.com", password: hashedPassword }, (error, parentResults) => {
//         if (error) {
//           return res.render("register", { message: "Error registering parent" });
//         }

//         const parentId = parentResults.insertId;

//         db.query("INSERT INTO student_parent SET ?", { student_id: student_id, parent_id: parentId }, (err2) => {
//           if (err2) {
//             return res.render("register", { message: "Error linking parent to student" });
//           }

//           return res.render("register", { message: "Parent Registered Successfully" });
//         });
//       });
//     });
//   });
// };
// exports.register = (req, res) => {
//   const { username, student_id, student_rollno, class: studentClass, pass, cpass } = req.body;

//   // Step 1: Check if student_id exists in DB with same class
//   db.query("SELECT * FROM students WHERE student_id = ? AND class = ?", 
//     [student_id, studentClass], 
//     (error, studentResults) => {
//       if (error) {
//         return res.render("register", { message: "Database error checking student ID" });
//       }

//       if (!studentResults || studentResults.length === 0) {
//         return res.render("register", { message: "Invalid Student ID or Class mismatch." });
//       }

//       // Step 2: Check parent existence
//       db.query("SELECT * FROM parents p JOIN student_parent sp ON p.parent_id = sp.parent_id WHERE sp.student_id = ?", 
//         [student_id], 
//         async (error, results) => {
//           if (error) {
//             return res.render("register", { message: "Error checking parent data" });
//           }

//           if (results && results.length > 0) {
//             return res.render("register", { message: "A parent for this Student ID is already registered" });
//           } else if (pass !== cpass) {
//             return res.render("register", { message: "Passwords do not match" });
//           }

//           // Step 3: Insert new parent
//           let hashedPassword = await bcrypt.hash(pass, 8);

//           db.query("INSERT INTO parents SET ?", 
//             { name: username, email: username + "@mail.com", password: hashedPassword }, 
//             (error, parentResults) => {
//               if (error) {
//                 return res.render("register", { message: "Error registering parent" });
//               }

//               const parentId = parentResults.insertId;

//               // Step 4: Link parent with student
//               db.query("INSERT INTO student_parent SET ?", 
//                 { student_id: student_id, parent_id: parentId }, 
//                 (err2) => {
//                   if (err2) {
//                     return res.render("register", { message: "Error linking parent to student" });
//                   }

//                   return res.render("register", { message: "Parent Registered Successfully" });
//                 });
//           });
//       });
//   });
// };
exports.register = (req, res) => {
  const { username, student_id, student_rollno, class: studentClass, pass, cpass } = req.body;

  if (!username || !student_id || !studentClass || !pass || !cpass) {
    return res.render("register", { message: "All fields are required" });
  }

  if (pass !== cpass) {
    return res.render("register", { message: "Passwords do not match" });
  }

  // Step 1: Validate student exists
  db.query(
    "SELECT * FROM students WHERE student_id = ? AND class = ?",
    [student_id, studentClass],
    (error, studentResults) => {
      if (error) return res.render("register", { message: "Database error checking student ID" });
      if (!studentResults.length) {
        return res.render("register", { message: "Invalid Student ID or Class mismatch." });
      }

      // Step 2: Ensure no parent already exists
      db.query(
        "SELECT * FROM parents p JOIN student_parent sp ON p.parent_id = sp.parent_id WHERE sp.student_id = ?",
        [student_id],
        async (error, results) => {
          if (error) return res.render("register", { message: "Error checking parent data" });
          if (results.length > 0) {
            return res.render("register", { message: "A parent for this Student ID is already registered" });
          }

          // Step 3: Insert parent
          let hashedPassword = await bcrypt.hash(pass, 8);
          db.query(
            "INSERT INTO parents SET ?",
            { name: username, email: username + "@mail.com", password: hashedPassword },
            (error, parentResults) => {
              if (error) return res.render("register", { message: "Error registering parent" });

              const parentId = parentResults.insertId;

              // Step 4: Link parent with student
              db.query(
                "INSERT INTO student_parent SET ?",
                { student_id: student_id, parent_id: parentId },
                (err2) => {
                  if (err2) return res.render("register", { message: "Error linking parent to student" });

                  // ✅ Set session
                  req.session.parentId = parentId;
                  req.session.username = username;
                  req.session.loggedIn = true;

                  req.session.save(() => {
                   res.redirect("/profile");// go to dashboard instead of re-render register
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

// ================= LOGIN =================
// exports.login = (req, res) => {
//   const { student_id, pass } = req.body;

//   db.query(
//     `SELECT p.* FROM parents p 
//      JOIN student_parent sp ON p.parent_id = sp.parent_id 
//      WHERE sp.student_id = ?`,
//     [student_id],
//     async (error, results) => {
//       if (error) return res.render("login", { message: "Server error during login" });
//       if (results.length === 0) return res.render("login", { message: "Parent is not registered" });

//       const parent = results[0];
//       const isMatch = await bcrypt.compare(pass, parent.password);

//       if (!isMatch) return res.render("login", { message: "Incorrect Password" });

//       req.session.student_id = student_id;
//       return res.render("profile", { parentName: parent.name });
//     }
//   );
// };

// exports.login = (req, res) => {
//   const { student_id, pass } = req.body;

//   db.query(
//     `SELECT p.*, s.class AS studentClass 
//      FROM parents p
//      JOIN student_parent sp ON p.parent_id = sp.parent_id
//      JOIN students s ON sp.student_id = s.student_id
//      WHERE sp.student_id = ?`,
//     [student_id],
//     async (error, results) => {
//       if (error) return res.render("login", { message: "Server error during login" });
//       if (results.length === 0) return res.render("login", { message: "Parent is not registered" });

//       const parent = results[0];
//       const isMatch = await bcrypt.compare(pass, parent.password);

//       if (!isMatch) return res.render("login", { message: "Incorrect Password" });

//       // ✅ Store both student_id and class in session
//       req.session.student_id = student_id;
//       req.session.studentClass = parent.studentClass;

//       console.log("Session after login:", req.session);

//       return res.render("profile", { parentName: parent.name });
//     }
//   );
// };

exports.login = (req, res) => {
  const { student_id, pass } = req.body;

  db.query(
    `SELECT p.*, s.class AS studentClass, s.student_name
     FROM parents p
     JOIN student_parent sp ON p.parent_id = sp.parent_id
     JOIN students s ON sp.student_id = s.student_id
     WHERE sp.student_id = ?`,
    [student_id],
    async (error, results) => {
      if (error) return res.render("login", { message: "Server error during login" });
      if (results.length === 0) return res.render("login", { message: "Parent is not registered" });

      const parent = results[0];
      const isMatch = await bcrypt.compare(pass, parent.password);

      if (!isMatch) return res.render("login", { message: "Incorrect Password" });

      // ✅ Store session data
      req.session.student_id = student_id;
      req.session.studentClass = parent.studentClass;
      req.session.parentName = parent.name;

      console.log("🔎 Session after login:", req.session);

      return res.render("profile", { 
        parentName: parent.name, 
        student_id: student_id, 
        student_class: parent.studentClass 
      });
    }
  );
};



// ================= TEACHER LOGIN =================
// exports.teacherlogin = (req, res) => {
//   const { username, password } = req.body;

//   db.query("SELECT * FROM teacher WHERE username = ? AND password = ?", 
//     [username, password], 
//     (err, results) => {
//       if (err) return res.render("teacherlogin", { message: "Server error" });

//       if (results.length > 0) {
//         return res.render("teacherDashboard", { message: "Welcome Teacher!" });
//       } else {
//         return res.render("teacherlogin", { message: "Invalid Username or Password" });
//       }
//     }
//   );
// };
exports.teacherlogin = (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM teacher WHERE username = ? AND password = ?", 
    [username, password], 
    (err, results) => {
      if (err) return res.render("teacherlogin", { message: "Server error" });

      if (results.length > 0) {
        req.session.teacherId = results[0].teacherid;
        return res.render("teacherDashboard", { message: "Welcome Teacher!" });
      } else {
        return res.render("teacherlogin", { message: "Invalid Username or Password" });
      }
    }
  );
};
