const express = require("express");
const {
  createSubject,
  getAllSubjects,
  getSubject,
  getSubjectByName,
  updateSubject,
  deleteSubject,
} = require("../../controllers/subjectController");

const router = express.Router();

router.route("/").get(getAllSubjects).post(createSubject);

router.route("/:id").get(getSubject).patch(updateSubject).delete(deleteSubject);

router.get("/name/:subjectName", getSubjectByName);

module.exports = router;
