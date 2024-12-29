const studentService = require("../services/studentService");
const catchAsync = require("../utils/catchAsync");

const createStudent = catchAsync(async (req, res) => {
  const student = await studentService.createStudent(req.body);

  res.status(201).json({
    status: "success",
    data: { student },
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const students = await studentService.getAllStudents();

  res.status(200).json({
    status: "success",
    results: students.length,
    data: { students },
  });
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);

  res.status(200).json({
    status: "success",
    data: { student },
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: { student },
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  await studentService.deleteStudent(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};