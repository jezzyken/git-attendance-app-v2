const express = require("express");
const router = express.Router();
const ClassSchedule = require("../../models/ClassSchedule");
const Student = require("../../models/Student");

router.get("/class-schedules", async (req, res) => {
  try {
    const { course, subject, teacher, weekDay, startTime, endTime } = req.query;

    const query = {};
    if (course) query.course = course;
    if (subject) query.subject = subject;
    if (teacher) query.teacher = teacher;
    if (weekDay) query.weekDays = weekDay;
    if (startTime) query.startTime = startTime;
    if (endTime) query.endTime = endTime;

    const schedules = await ClassSchedule.find(query)
      .populate({
        path: "students",
        populate: {
          path: "user",
          select: "firstName lastName middleName",
        },
      })
      .populate({
        path: "teacher",
        select: "user",
        populate: {
          path: "user",
          select: "firstName lastName middleName",
        },
      })
      .populate("course", "courseName code")
      .populate("subject", "subjectName code")
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        total: schedules.length,
        schedules,
      },
    });
  } catch (error) {
    console.error("Report error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching class schedules",
      error: error.message,
    });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $unwind: "$courseInfo",
      },
      {
        $project: {
          studentId: 1,
          "userInfo.firstName": 1,
          "userInfo.middleName": 1,
          "userInfo.lastName": 1,
          "userInfo.dateOfBirth": 1,
          "userInfo.gender": 1,
          "courseInfo.name": 1,
          level: 1,
          section: 1,
          parentName: 1,
          parentNo: 1,
          parentEmail: 1,
          parentAddress: 1,
        },
      },
    ]);

    const formattedData = students.map((student) => ({
      studentId: student.studentId,
      fullName: `${student.userInfo.lastName}, ${student.userInfo.firstName} ${
        student.userInfo.middleName || ""
      }`.trim(),
      dateOfBirth: student.userInfo.dateOfBirth,
      gender: student.userInfo.gender,
      course: student.courseInfo.name,
      level: student.level,
      section: student.section,
      parentName: student.parentName,
      parentContact: student.parentNo,
      parentEmail: student.parentEmail,
      parentAddress: student.parentAddress,
    }));

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error generating student report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate student report",
    });
  }
});

module.exports = router;
