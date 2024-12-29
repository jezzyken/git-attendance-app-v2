const express = require("express");
const studentController = require("../../controllers/studentController");
const { auth, authorize } = require("../../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(auth, studentController.getAllStudents)
  .post(auth, authorize("admin"), studentController.createStudent);

router
  .route("/:id")
  .get(auth, studentController.getStudent)
  .patch(auth, authorize("admin"), studentController.updateStudent)
  .delete(auth, authorize("admin"), studentController.deleteStudent);

module.exports = router;