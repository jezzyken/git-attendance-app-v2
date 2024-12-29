const express = require("express");
const classAttendanceController = require("../../controllers/classAttendanceController");
const { auth } = require("../../middleware/authMiddleware")

const router = express.Router();

// Protect all routes after this middleware
// router.use(auth);

router.get("/check", classAttendanceController.checkExistingAttendance);

router.get("/date-range", classAttendanceController.getAttendanceByDateRange);

router.get("/stats/:scheduleId", classAttendanceController.getAttendanceStats);

router.get(
  "/schedule/:scheduleId",
  classAttendanceController.getAttendanceBySchedule
);

router.get(
  "/student/:studentId",
  classAttendanceController.getStudentAttendance
);

router
  .route("/")
  .get(classAttendanceController.getAllAttendance)
  .post(classAttendanceController.createAttendance);

router
  .route("/:id")
  .get(classAttendanceController.getAttendanceById)
  .put(classAttendanceController.updateAttendance)
  .delete(classAttendanceController.deleteAttendance);

router.patch(
  "/:id/student/:studentId",
  classAttendanceController.updateStudentAttendance
);

module.exports = router;
