const express = require("express");
const router = express.Router();
const ClassAttendance = require("../../models/ClassAttendance");
const { auth } = require("../../middleware/authMiddleware")
const moment = require("moment");

router.post("/", auth, async (req, res) => {
  try {
    const { classSchedule, attendanceDate, daysOfWeek, attendanceRecords } =
      req.body;

    const attendance = new ClassAttendance({
      classSchedule,
      attendanceDate,
      daysOfWeek,
      attendanceRecords,
    });

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance recorded successfully",
      data: attendance,
    });
  } catch (error) {
    console.log(error)
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
    const formattedDate = moment(date).tz("Asia/Singapore").format("YYYY-MM-DD");

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
