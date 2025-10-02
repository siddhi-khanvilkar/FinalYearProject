// const express = require("express");
// const authController = require("../controller/auth");
// const router = express.Router();
// const attendanceCtrl = require("../controller/attendence");
// const noticeController = require("../controller/notice");
// const path = require("path");


// router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.post("/teacherlogin", authController.teacherlogin);



// // Teacher: after form submit -> load students and show table
// router.post("/load-students", attendanceCtrl.loadStudents);

// // Teacher: save attendance
// router.post("/save", attendanceCtrl.saveAttendance);


// // Handle notice upload
// router.post('/uploadnotice', upload.single('noticePDF'), noticeController.uploadNotice);





// module.exports=router;

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

// router.post('/uploadtimetable', upload.single('timetablePDF'), timetableController.uploadTimetable);

// router.post('/sendmessage', messageController.sendMessage);




module.exports = router;
