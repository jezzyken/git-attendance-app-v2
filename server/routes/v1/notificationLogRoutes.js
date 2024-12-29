const express = require("express");
const router = express.Router();
const NotificationLog = require("../../models/NotificationLog");
const ClassSchedule = require("../../models/ClassSchedule");
const ObjectId = require("mongoose").Types.ObjectId;

const moment = require("moment");
const { isValidObjectId } = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const { studentId, classScheduleId, startDate, endDate, emailSent } =
      req.query;

    let query = {};

    if (studentId && isValidObjectId(studentId)) {
      query.student = studentId;
    }

    if (classScheduleId && isValidObjectId(classScheduleId)) {
      query.classSchedule = classScheduleId;
    }

    if (startDate && endDate) {
      query.attendanceDate = {
        $gte: moment(startDate).startOf("day").toDate(),
        $lte: moment(endDate).endOf("day").toDate(),
      };
    }

    if (emailSent !== undefined) {
      query.emailSent = emailSent === "true";
    }

    const logs = await NotificationLog.find(query)
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "firstName lastName email",
        },
      })
      .populate({
        path: "classSchedule",
        populate: [
          {
            path: "subject",
            select: "name",
          },
          {
            path: "course",
            select: "name",
          },
        ],
      })
      .sort("-createdAt");

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error("Error fetching notification logs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notification logs",
      error: error.message,
    });
  }
});

router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    let query = { student: studentId };

    if (startDate && endDate) {
      query.attendanceDate = {
        $gte: moment(startDate).startOf("day").toDate(),
        $lte: moment(endDate).endOf("day").toDate(),
      };
    }

    const logs = await NotificationLog.find(query)
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "firstName lastName email",
        },
      })
      .populate({
        path: "classSchedule",
        populate: [
          {
            path: "subject",
            select: "name",
          },
          {
            path: "course",
            select: "name",
          },
        ],
      })
      .sort("-createdAt");

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error("Error fetching student notification logs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching student notification logs",
      error: error.message,
    });
  }
});

router.get("/class/:classScheduleId", async (req, res) => {
  try {
    const { classScheduleId } = req.params;
    const { startDate, endDate } = req.query;

    let query = { classSchedule: classScheduleId };

    if (startDate && endDate) {
      query.attendanceDate = {
        $gte: moment(startDate).startOf("day").toDate(),
        $lte: moment(endDate).endOf("day").toDate(),
      };
    }

    const logs = await NotificationLog.find(query)
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "firstName lastName email",
        },
      })
      .populate({
        path: "classSchedule",
        populate: [
          {
            path: "subject",
            select: "name",
          },
          {
            path: "course",
            select: "name",
          },
        ],
      })
      .sort("-createdAt");

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error("Error fetching class schedule notification logs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching class schedule notification logs",
      error: error.message,
    });
  }
});

router.get("/teacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { startDate, endDate } = req.query;

    const teacherSchedules = await ClassSchedule.find({
      teacher: teacherId,
    })
      .populate("subject", "name subjectName")
      .populate("course", "name");

    const scheduleIds = teacherSchedules.map((schedule) => schedule._id);

    let query = {
      classSchedule: { $in: scheduleIds },
    };

    if (startDate && endDate) {
      query.attendanceDate = {
        $gte: moment(startDate).startOf("day").toDate(),
        $lte: moment(endDate).endOf("day").toDate(),
      };
    }

    const logs = await NotificationLog.find(query)
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "firstName lastName",
        },
        select: "studentId section parentEmail",
      })
      .populate({
        path: "classSchedule",
        populate: [
          {
            path: "subject",
            select: "name subjectName",
          },
          {
            path: "course",
            select: "name",
          },
        ],
        select: "section startTime endTime",
      })
      .sort("-createdAt");

    // Flatten and process the logs
    const processedLogs = logs.map((log) => ({
      id: log._id,
      studentId: log.student.studentId,
      studentName: `${log.student.user.firstName} ${log.student.user.lastName}`,
      studentSection: log.student.section,
      parentEmail: log.student.parentEmail,
      subject:
        log.classSchedule.subject.name || log.classSchedule.subject.subjectName,
      course: log.classSchedule.course.name,
      classSection: log.classSchedule.section,
      classTime: `${log.classSchedule.startTime} - ${log.classSchedule.endTime}`,
      attendanceDate: log.attendanceDate,
      emailSent: log.emailSent,
      emailSentAt: log.emailSentAt,
      message: log.message,
      createdAt: log.createdAt,
    }));

    // Group logs by class for easier UI rendering
    const groupedByClass = processedLogs.reduce((acc, log) => {
      const classKey = log.subject;
      if (!acc[classKey]) {
        acc[classKey] = [];
      }
      acc[classKey].push(log);
      return acc;
    }, {});

    const summary = {
      totalSchedules: scheduleIds.length,
      totalLogs: logs.length,
      dateRange: {
        start: startDate ? moment(startDate).format("YYYY-MM-DD") : "All time",
        end: endDate ? moment(endDate).format("YYYY-MM-DD") : "All time",
      },
      emailsSent: logs.filter((log) => log.emailSent).length,
      uniqueStudents: new Set(logs.map((log) => log.student._id.toString()))
        .size,
      emailSuccessRate:
        logs.length > 0
          ? (
              (logs.filter((log) => log.emailSent).length / logs.length) *
              100
            ).toFixed(1) + "%"
          : "0%",
    };

    res.json({
      success: true,
      logs: processedLogs,
      groupedLogs: groupedByClass,
      summary,
    });
  } catch (error) {
    console.error("Error fetching teacher notification logs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching teacher notification logs",
      error: error.message,
    });
  }
});
router.get("/teacher/:teacherId/summary", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { startDate, endDate } = req.query;

    const teacherSchedules = await ClassSchedule.find({
      teacher: teacherId,
    })
      .populate("subject")
      .populate("course")
      .populate({
        path: "students",
        select: "studentId",
      })
      .lean();

    const scheduleIds = teacherSchedules.map((schedule) => schedule._id);

    let dateMatch = {};
    if (startDate && endDate) {
      dateMatch = {
        attendanceDate: {
          $gte: moment(startDate).startOf("day").toDate(),
          $lte: moment(endDate).endOf("day").toDate(),
        },
      };
    }

    const summary = await NotificationLog.aggregate([
      {
        $match: {
          classSchedule: { $in: scheduleIds },
          ...dateMatch,
        },
      },
      {
        $group: {
          _id: "$classSchedule",
          totalNotifications: { $sum: 1 },
          emailsSent: {
            $sum: { $cond: ["$emailSent", 1, 0] },
          },
          failedEmails: {
            $sum: { $cond: ["$emailSent", 0, 1] },
          },
          uniqueStudents: { $addToSet: "$student" },
          dates: { $addToSet: "$attendanceDate" },
          // Group by month for trend analysis
          monthlyStats: {
            $push: {
              date: "$attendanceDate",
              student: "$student",
              emailSent: "$emailSent",
            },
          },
        },
      },
      {
        $project: {
          totalNotifications: 1,
          emailsSent: 1,
          failedEmails: 1,
          uniqueStudentsCount: { $size: "$uniqueStudents" },
          uniqueDatesCount: { $size: "$dates" },
          monthlyStats: 1,
          emailSuccessRate: {
            $multiply: [
              {
                $divide: ["$emailsSent", { $max: ["$totalNotifications", 1] }],
              },
              100,
            ],
          },
        },
      },
    ]);

    // Enhance summary with schedule details and trends
    const enhancedSummary = await Promise.all(
      summary.map(async (item) => {
        const schedule = teacherSchedules.find((s) => s._id.equals(item._id));

        // Calculate monthly trends
        const monthlyTrends = item.monthlyStats.reduce((acc, stat) => {
          const month = moment(stat.date).format("YYYY-MM");
          if (!acc[month]) {
            acc[month] = {
              absences: 0,
              uniqueStudents: new Set(),
              emailsSent: 0,
            };
          }
          acc[month].absences++;
          acc[month].uniqueStudents.add(stat.student.toString());
          if (stat.emailSent) acc[month].emailsSent++;
          return acc;
        }, {});

        // Convert monthly trends to array and calculate rates
        const trends = Object.entries(monthlyTrends).map(([month, stats]) => ({
          month,
          absences: stats.absences,
          uniqueStudents: stats.uniqueStudents.size,
          emailsSent: stats.emailsSent,
          absenteeRate:
            (stats.uniqueStudents.size / schedule.students.length) * 100,
        }));

        return {
          classSchedule: {
            _id: schedule._id,
            subject: schedule.subject,
            course: schedule.course,
            totalStudents: schedule.students.length,
          },
          statistics: {
            totalNotifications: item.totalNotifications,
            emailsSent: item.emailsSent,
            failedEmails: item.failedEmails,
            uniqueStudentsCount: item.uniqueStudentsCount,
            uniqueDatesCount: item.uniqueDatesCount,
            emailSuccessRate: Number(item.emailSuccessRate.toFixed(2)),
            absenteeRate: Number(
              (
                (item.uniqueStudentsCount / schedule.students.length) *
                100
              ).toFixed(2)
            ),
          },
          trends: trends.sort((a, b) => moment(a.month).diff(moment(b.month))),
        };
      })
    );

    const overallStats = enhancedSummary.reduce(
      (acc, item) => {
        acc.totalNotifications += item.statistics.totalNotifications;
        acc.totalEmailsSent += item.statistics.emailsSent;
        acc.totalFailedEmails += item.statistics.failedEmails;
        acc.totalUniqueStudents += item.statistics.uniqueStudentsCount;
        return acc;
      },
      {
        totalNotifications: 0,
        totalEmailsSent: 0,
        totalFailedEmails: 0,
        totalUniqueStudents: 0,
      }
    );

    res.json({
      success: true,
      data: enhancedSummary,
      overallSummary: {
        totalSchedules: teacherSchedules.length,
        ...overallStats,
        emailSuccessRate: Number(
          (
            (overallStats.totalEmailsSent / overallStats.totalNotifications) *
            100
          ).toFixed(2)
        ),
        dateRange: {
          start: startDate
            ? moment(startDate).format("YYYY-MM-DD")
            : "All time",
          end: endDate ? moment(endDate).format("YYYY-MM-DD") : "All time",
        },
        period:
          startDate && endDate
            ? moment(endDate).diff(moment(startDate), "days") + 1
            : null,
      },
    });
  } catch (error) {
    console.error("Error fetching teacher summary:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching teacher summary",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const log = await NotificationLog.findById(req.params.id)
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "firstName lastName email",
        },
      })
      .populate({
        path: "classSchedule",
        populate: [
          {
            path: "subject",
            select: "name",
          },
          {
            path: "course",
            select: "name",
          },
        ],
      });

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Notification log not found",
      });
    }

    res.json({
      success: true,
      data: log,
    });
  } catch (error) {
    console.error("Error fetching notification log:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notification log",
      error: error.message,
    });
  }
});

router.delete("/cleanup", async (req, res) => {
  try {
    const { olderThan = 30 } = req.query;
    const cutoffDate = moment().subtract(olderThan, "days").toDate();

    const result = await NotificationLog.deleteMany({
      createdAt: { $lt: cutoffDate },
    });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} old notification logs`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error cleaning up notification logs:", error);
    res.status(500).json({
      success: false,
      message: "Error cleaning up notification logs",
      error: error.message,
    });
  }
});

module.exports = router;
