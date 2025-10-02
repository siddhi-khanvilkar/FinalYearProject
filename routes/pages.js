const express = require("express");
const router = express.Router();
const attendanceCtrl = require("../controller/attendence");
const multer = require('multer');
const noticeController = require('../controller/notice');
const timetableController = require('../controller/timetable');
const messageController = require('../controller/message');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// Static views
router.get("/", (req, res) => res.render("index"));
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.get("/teacherlogin", (req, res) => res.render("teacherlogin"));
router.get("/teacherDashboard", (req, res) => res.render("teacherDashboard"));



// Attendance
router.get("/uploadattendence", (req, res) => res.render("uploadattendence"));  // Step 1: Teacher loads page
router.post("/load-students", attendanceCtrl.loadStudents);                      // Step 2: Load students (POST)
router.post("/uploadattendence", attendanceCtrl.saveAttendance);                 // Step 3: Save attendance
router.get("/viewattendence", attendanceCtrl.viewAttendance);                    // Step 4: Parent view


//notice 
router.get("/uploadnotice", (req, res) => res.render("uploadnotice"));
router.post('/uploadnotice', upload.single('noticePDF'), noticeController.uploadnotice);
router.get("/viewnotice", noticeController.getNotices);         
router.get("/notice/:id", noticeController.getNoticeById);


//timetable
router.get("/viewtimetable", timetableController.viewTimetable);
router.get("/uploadtimetable", (req, res) => res.render("uploadtimetable"));
router.post('/uploadtimetable', upload.single('timetablePDF'), timetableController.uploadTimetable);
router.get("/timetables/:filename", timetableController.getTimetableFile); // Serve timetable file from DB

// Messaging routes
router.get("/contactmentor", messageController.contactMentorPage);   
router.post("/sendmessageparent", messageController.sendMessageParent);
router.get("/contactparent", messageController.contactParentPage);   
router.post("/sendmessageteacher", messageController.sendMessageTeacher);
router.get("/contactparent", (req, res) => res.render("contactparent"));


      console.log("attendanceCtrl:", attendanceCtrl);
console.log("noticeController:", noticeController);
console.log("timetableController:", timetableController);
console.log("messageController:", messageController);


// Profile route with session data
router.get("/profile", (req, res) => {
  const parentName = req.session.parentName;
  const parentStudentId = req.session.student_id;
  const parentClass = req.session.student_class; 
  console.log("🔎 Profile session:", req.session);
  res.render("profile", { parentName, student_id: parentStudentId,student_class: parentClass});
  

});

module.exports = router;

