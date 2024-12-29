const classAttendanceService = require("../services/classAttendanceService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createAttendance = catchAsync(async (req, res) => {
  const attendance = await classAttendanceService.createAttendance(req.body);

  res.status(201).json({
    status: "success",
    data: { attendance },
  });
});

const getAllAttendance = catchAsync(async (req, res) => {
  console.log(req.query)
  console.log("getting all attendance")
  const attendance = await classAttendanceService.getAllAttendance(req.query);

  console.log(attendance)

  res.status(200).json({
    status: "success",
    results: attendance.length,
    data: { attendance },
  });
});

const getAttendanceById = catchAsync(async (req, res) => {
  const attendance = await classAttendanceService.getAttendanceById(req.params.id);

  res.status(200).json({
    status: "success",
    data: { attendance },
  });
});

const getAttendanceBySchedule = catchAsync(async (req, res) => {
  const attendance = await classAttendanceService.getAttendanceBySchedule(
    req.params.scheduleId
  );

  res.status(200).json({
    status: "success",
    results: attendance.length,
    data: { attendance },
  });
});

const getAttendanceByDateRange = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    throw new AppError("Please provide both start and end dates", 400);
  }

  const attendance = await classAttendanceService.getAttendanceByDateRange(
    startDate,
    endDate
  );

  res.status(200).json({
    status: "success",
    results: attendance.length,
    data: { attendance },
  });
});

const getStudentAttendance = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const attendance = await classAttendanceService.getStudentAttendance(
    req.params.studentId,
    startDate,
    endDate
  );

  res.status(200).json({
    status: "success",
    results: attendance.length,
    data: { attendance },
  });
});

const updateAttendance = catchAsync(async (req, res) => {
  const attendance = await classAttendanceService.updateAttendance(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: "success",
    data: { attendance },
  });
});

const updateStudentAttendance = catchAsync(async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    throw new AppError("Please provide attendance status", 400);
  }

  const attendance = await classAttendanceService.updateStudentAttendance(
    req.params.id,
    req.params.studentId,
    status
  );

  res.status(200).json({
    status: "success",
    data: { attendance },
  });
});

const deleteAttendance = catchAsync(async (req, res) => {
  await classAttendanceService.deleteAttendance(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const getAttendanceStats = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    throw new AppError("Please provide both start and end dates", 400);
  }

  const stats = await classAttendanceService.getAttendanceStats(
    req.params.scheduleId,
    startDate,
    endDate
  );

  res.status(200).json({
    status: "success",
    results: stats.length,
    data: { stats },
  });
});

const checkExistingAttendance = catchAsync(async (req, res) => {
  const { classScheduleId, date } = req.query;

  if (!classScheduleId || !date) {
    throw new AppError("Please provide both classScheduleId and date", 400);
  }

  const existingAttendance = await classAttendanceService.checkExistingAttendance(
    classScheduleId,
    date
  );

  res.status(200).json({
    status: "success",
    data: {
      exists: !!existingAttendance,
      attendance: existingAttendance,
    },
  });
});

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  getAttendanceBySchedule,
  getAttendanceByDateRange,
  getStudentAttendance,
  updateAttendance,
  updateStudentAttendance,
  deleteAttendance,
  getAttendanceStats,
  checkExistingAttendance,
};