const courseService = require("../services/courseService");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createCourse = catchAsync(async (req, res, next) => {
  if (!req.body.courseName || !req.body.courseCode) {
    return next(new AppError("Please provide courseName and courseCode", 400));
  }
  const course = await courseService.createCourse(req.body);
  res.status(201).json({
    status: "success",
    data: { course },
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: { courses },
  });
});

const getCourse = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide course ID", 400));
  }
  const course = await courseService.getCourseById(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { course },
  });
});

const getCourseByName = catchAsync(async (req, res, next) => {
  if (!req.params.courseName) {
    return next(new AppError("Please provide course name", 400));
  }
  const course = await courseService.getCourseByName(req.params.courseName);
  if (!course) {
    return next(new AppError("No course found with that name", 404));
  }
  res.status(200).json({
    status: "success",
    data: { course },
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide course ID", 400));
  }
  const course = await courseService.updateCourse(req.params.id, req.body);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { course },
  });
});


const deleteCourse = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide course ID", 400));
  }
  await courseService.deleteCourse(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  getCourseByName,
  updateCourse,
  deleteCourse,
};
