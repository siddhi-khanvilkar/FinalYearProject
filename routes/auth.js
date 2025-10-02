

const express = require("express");
const authController = require("../controller/auth");
const attendanceCtrl = require("../controller/attendence");
const noticeController = require("../controller/notice");
const router = express.Router();
const path = require("path");
const messageController = require('../controller/message');
const timetableController = require('../controller/timetable');





// ✅ Multer setup (for handling PDF uploads)
const multer = require('multer');
const storage = multer.memoryStorage(); // or use diskStorage if storing locally (not reliable on Render)
const upload = multer({ storage: storage });

// 🧑‍🎓 Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/teacherlogin", authController.teacherlogin);

// 🧑‍🏫 Attendance Routes
router.post("/load-students", attendanceCtrl.loadStudents);

router.post("/save", attendanceCtrl.saveAttendance);


// 📄 Notice Upload Route
router.post('/uploadnotice', upload.single('noticePDF'), noticeController.uploadnotice);






module.exports = router;
