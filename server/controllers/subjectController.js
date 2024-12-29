const subjectService = require("../services/subjectService");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createSubject = catchAsync(async (req, res, next) => {
  if (!req.body.subjectName) {
    return next(new AppError("Please provide subject name", 400));
  }

  const subject = await subjectService.createSubject(req.body);
  res.status(201).json({
    status: "success",
    data: { subject },
  });
});

const getAllSubjects = catchAsync(async (req, res) => {
  const subjects = await subjectService.getAllSubjects();
  res.status(200).json({
    status: "success",
    results: subjects.length,
    data: { subjects },
  });
});

const getSubject = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide subject ID", 400));
  }

  const subject = await subjectService.getSubjectById(req.params.id);
  if (!subject) {
    return next(new AppError("No subject found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { subject },
  });
});

const getSubjectByName = catchAsync(async (req, res, next) => {
  if (!req.params.subjectName) {
    return next(new AppError("Please provide subject name", 400));
  }

  const subject = await subjectService.getSubjectByName(req.params.subjectName);
  if (!subject) {
    return next(new AppError("No subject found with that name", 404));
  }

  res.status(200).json({
    status: "success",
    data: { subject },
  });
});

const updateSubject = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide subject ID", 400));
  }

  const subject = await subjectService.updateSubject(req.params.id, req.body);
  if (!subject) {
    return next(new AppError("No subject found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { subject },
  });
});

const deleteSubject = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please provide subject ID", 400));
  }

  await subjectService.deleteSubject(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createSubject,
  getAllSubjects,
  getSubject,
  getSubjectByName,
  updateSubject,
  deleteSubject,
};
