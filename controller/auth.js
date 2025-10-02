const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


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
