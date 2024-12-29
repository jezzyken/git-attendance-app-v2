const classScheduleService = require("../services/classScheduleService");
const catchAsync = require("../utils/catchAsync");

const createClassSchedule = catchAsync(async (req, res) => {
  const schedule = await classScheduleService.createClassSchedule(req.body);

  res.status(201).json({
    status: "success",
    data: { schedule },
  });
});

const getAllClassSchedules = catchAsync(async (req, res) => {
  const schedules = await classScheduleService.getAllClassSchedules();

  res.status(200).json({
    status: "success",
    results: schedules.length,
    data: { schedules },
  });
});

const getClassSchedule = catchAsync(async (req, res) => {
  const schedule = await classScheduleService.getClassScheduleById(req.params.id);

  res.status(200).json({
    status: "success",
    data: { schedule },
  });
});

const getClassSchedulesByTeacher = catchAsync(async (req, res) => {
  const schedule = await classScheduleService.getClassSchedulesByTeacher(req.params.id);
  console.log(schedule)
  res.status(200).json({
    status: "success",
    data: { schedule },
  });
});

const getStudentsByClassId = catchAsync(async (req, res) => {
  const schedule = await classScheduleService.getStudentsByClassId(req.params.id);
  console.log(schedule)
  res.status(200).json({
    status: "success",
    data: { schedule },
  });
});

const updateClassSchedule = catchAsync(async (req, res) => {
  const schedule = await classScheduleService.updateClassSchedule(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: "success",
    data: { schedule },
  });
});

const deleteClassSchedule = catchAsync(async (req, res) => {
  await classScheduleService.deleteClassSchedule(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createClassSchedule,
  getAllClassSchedules,
  getClassSchedule,
  getClassSchedulesByTeacher,
  getStudentsByClassId,
  updateClassSchedule,
  deleteClassSchedule,
};