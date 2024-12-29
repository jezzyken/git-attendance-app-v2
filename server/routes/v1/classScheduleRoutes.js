const express = require("express");
const classScheduleController = require("../../controllers/classScheduleController");
const { auth, authorize } = require("../../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(classScheduleController.getAllClassSchedules)
  .post(classScheduleController.createClassSchedule);

router
  .route("/:id")
  .get(classScheduleController.getClassSchedule)
  .patch(classScheduleController.updateClassSchedule)
  .delete(classScheduleController.deleteClassSchedule);

router
  .route("/teacher/:id")
  .get(classScheduleController.getClassSchedulesByTeacher);

router
  .route("/student/:classId")
  .get(classScheduleController.getStudentsByClassId);

module.exports = router;
