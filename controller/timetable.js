const path = require('path');
const fs = require('fs');
const db = require('../db');



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
