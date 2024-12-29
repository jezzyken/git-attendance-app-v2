const express = require("express");
const courseController = require("../../controllers/courseController");
const { auth, authorize } = require("../../middleware/authMiddleware");

const router = express.Router();
router
  .route("/")
  .get(courseController.getAllCourses)
  .post(auth, authorize("admin"), courseController.createCourse);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(auth, authorize("admin"), courseController.updateCourse)
  .delete(auth, authorize("admin"), courseController.deleteCourse);

router.get("/name/:courseName", courseController.getCourseByName);

module.exports = router;
