const reportService = require('../services/reportService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

module.exports = {
  getStudentsByTeacher: catchAsync(async (req, res, next) => {
    const teacherId = req.params.teacherId;
    console.log("fuk")

    // if (!teacherId) {
    //   return next(new AppError('Teacher ID is required', 400));
    // }

    // const schedules = await reportService.getStudentsByTeacher(teacherId);

    // res.status(200).json({
    //   status: 'success',
    //   data: { schedules }
    // });
  }),

  getStudentsByCourse: catchAsync(async (req, res, next) => {
    const courseId = req.params.courseId;
    if (!courseId) {
      return next(new AppError('Course ID is required', 400));
    }

    const schedules = await reportService.getStudentsByCourse(courseId);
    res.status(200).json({
      status: 'success',
      data: { schedules }
    });
  }),

  getStudentsBySubject: catchAsync(async (req, res, next) => {
    const subjectId = req.params.subjectId;
    if (!subjectId) {
      return next(new AppError('Subject ID is required', 400));
    }

    const schedules = await reportService.getStudentsBySubject(subjectId);
    res.status(200).json({
      status: 'success',
      data: { schedules }
    });
  })
};