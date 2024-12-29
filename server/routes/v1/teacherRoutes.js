const express = require("express");
const teacherController = require("../../controllers/teacherController");
const { auth, authorize } = require("../../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(auth, authorize("admin"), teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(auth, authorize("admin"), teacherController.updateTeacher)
  .delete(auth, authorize("admin"), teacherController.deleteTeacher);

module.exports = router;