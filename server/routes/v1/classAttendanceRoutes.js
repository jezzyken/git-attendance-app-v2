const express = require("express");
const router = express.Router();
const ClassAttendance = require("../../models/ClassAttendance");
const notificationLogs = require("../../models/SmsLog");
const { auth } = require("../../middleware/authMiddleware");
const moment = require("moment");
const axios = require("axios");

router.post("/", auth, async (req, res) => {
  try {
    const {
      classSchedule,
      attendanceDate,
      daysOfWeek,
      attendanceRecords,
      schedule,
      settings,
    } = req.body;

    const smsLogs = [];

    for (const student of schedule.students) {
      const { parentNo, parentName, _id, user } = student;
      const studentName = `${user.firstName} ${user.lastName}` || "Student";
      const studentStatus = attendanceRecords.find(
        (record) => record.student === _id
      )?.status;

      if (parentNo && studentStatus) {
        const shouldNotify =
          (settings.notifyAbsent && studentStatus === "absent") ||
          (settings.notifyPresent && studentStatus === "present");

        if (shouldNotify) {
          const message = settings.smsTemplate
            .replace("{studentName}", studentName)
            .replace("{subject}", schedule.subject.subjectName)
            .replace("{date}", schedule.selectedDate)
            .replace("{status}", studentStatus);

          try {
            const response = await axios.post(
              `${process.env.PHILSMS_API_URL}`,
              {
                recipient: parentNo,
                sender_id: process.env.SENDER_ID,
                type: "plain",
                message,
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.PHILSMS_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );

            smsLogs.push({
              student: _id,
              parentName,
              parentNo,
              message,
              serverMessage: response.data.message,
              status: response.data.data.status,
              sentAt: response.data.data.created_at,
            });
            console.log(smsLogs);
          } catch (smsError) {
            console.error(`Failed to send SMS to ${parentName}:`, smsError);
            smsLogs.push({
              student: _id,
              parentName,
              parentNo,
              message,
              serverMessage: response.data.message,
              status: response.data.data.status,
              sentAt: response.data.data.created_at,
            });
            console.log(smsLogs);
          }
        }
      }
    }

    const attendance = new ClassAttendance({
      classSchedule,
      attendanceDate,
      daysOfWeek,
      attendanceRecords,
    });

    if (smsLogs.length > 0) {
      try {
        const logs = new notificationLogs({
          classScheduleId: schedule._id,
          attendanceId: attendance._id,
          logs: smsLogs,
        });
        await logs.save();
      } catch (logError) {
        console.error("Failed to save SMS logs:", logError);
      }
    }

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance recorded successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to record attendance",
      error: error.message,
    });
  }
});

router.get("/schedule/:scheduleId", auth, async (req, res) => {
  try {
    const attendance = await ClassAttendance.find({
      classSchedule: req.params.scheduleId,
    })
      .populate("classSchedule")
      .populate("attendanceRecords.student")
      .sort({ attendanceDate: -1 });

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance records",
      error: error.message,
    });
  }
});

router.get("/date-range", auth, async (req, res) => {
  try {
    const { startDate, endDate, scheduleId } = req.query;

    const query = {
      attendanceDate: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (scheduleId) {
      query.classSchedule = scheduleId;
    }

    const attendance = await ClassAttendance.find(query)
      .populate("classSchedule")
      .populate("attendanceRecords.student")
      .sort({ attendanceDate: -1 });

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance records",
      error: error.message,
    });
  }
});

router.get("/student/:studentId", auth, async (req, res) => {
  try {
    const attendance = await ClassAttendance.find({
      "attendanceRecords.student": req.params.studentId,
    })
      .populate("classSchedule")
      .populate("attendanceRecords.student")
      .sort({ attendanceDate: -1 });

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student attendance records",
      error: error.message,
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { attendanceRecords } = req.body;

    const attendance = await ClassAttendance.findByIdAndUpdate(
      req.params.id,
      { $set: { attendanceRecords } },
      { new: true }
    )
      .populate("classSchedule")
      .populate("attendanceRecords.student");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update attendance record",
      error: error.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const attendance = await ClassAttendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete attendance record",
      error: error.message,
    });
  }
});

router.get("/schedule/:scheduleId/:date", auth, async (req, res) => {
  try {
    const { scheduleId, date } = req.params;
    const formattedDate = moment(date)
      .tz("Asia/Singapore")
      .format("YYYY-MM-DD");

    console.log({
      classSchedule: scheduleId,
      attendanceDate: formattedDate,
    });

    const attendance = await ClassAttendance.findOne({
      classSchedule: scheduleId,
      attendanceDate: formattedDate,
    })
      .populate("classSchedule")
      .populate("attendanceRecords.student");

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
});

module.exports = router;
