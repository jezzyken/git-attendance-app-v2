const express = require("express");
const router = express.Router();
const ClassSchedule = require("../../models/ClassSchedule");

router.get("/class-schedules", async (req, res) => {
  try {
    const { teacher, course, subject, section, weekDay, startDate, endDate } =
      req.query;

    const query = {};

    if (teacher) query.teacher = teacher;
    if (course) query.course = course;
    if (subject) query.subject = subject;
    if (section) query.section = section;
    if (weekDay) query.weekDays = weekDay;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const classSchedules = await ClassSchedule.find(query)
      .populate("teacher", "name email")
      .populate("course", "name code")
      .populate("subject", "name code")
      .populate("students", "name studentId")
      .lean();

    const formattedSchedules = classSchedules.map((schedule) => ({
      id: schedule._id,
      teacherName: schedule.teacher.name,
      teacherEmail: schedule.teacher.email,
      courseName: schedule.course.name,
      courseCode: schedule.course.code,
      subjectName: schedule.subject.name,
      subjectCode: schedule.subject.code,
      section: schedule.section,
      weekDays: schedule.weekDays,
      timing: {
        start: schedule.startTime,
        end: schedule.endTime,
      },
      studentsCount: schedule.students.length,
      students: schedule.students.map((student) => ({
        id: student._id,
        name: student.name,
        studentId: student.studentId,
      })),
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      data: {
        total: formattedSchedules.length,
        schedules: formattedSchedules,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching class schedules",
      error: error.message,
    });
  }
});

module.exports = router;
