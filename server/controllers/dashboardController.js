const ClassAttendance = require('../models/ClassAttendance');
const ClassSchedule = require('../models/ClassSchedule');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const moment = require('moment');

exports.getDashboardData = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const classCount = await ClassSchedule.countDocuments();

    const today = moment().format('YYYY-MM-DD');
    const todayAttendance = await ClassAttendance.aggregate([
      {
        $match: {
          attendanceDate: today
        }
      },
      {
        $unwind: '$attendanceRecords'
      },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          presentStudents: {
            $sum: {
              $cond: [
                { $eq: ['$attendanceRecords.status', 'present'] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const attendanceRate = todayAttendance.length > 0
      ? Math.round((todayAttendance[0].presentStudents / todayAttendance[0].totalStudents) * 100)
      : 0;

    const weekStart = moment().startOf('week');
    const weeklyAttendance = await ClassAttendance.aggregate([
      {
        $match: {
          attendanceDate: {
            $gte: weekStart.format('YYYY-MM-DD'),
            $lte: moment().format('YYYY-MM-DD')
          }
        }
      },
      {
        $unwind: '$attendanceRecords'
      },
      {
        $group: {
          _id: '$attendanceDate',
          totalStudents: { $sum: 1 },
          presentStudents: {
            $sum: {
              $cond: [
                { $eq: ['$attendanceRecords.status', 'present'] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const classDistribution = await ClassSchedule.aggregate([
      {
        $lookup: {
          from: 'subjects',
          localField: 'subject',
          foreignField: '_id',
          as: 'subjectDetails'
        }
      },
      {
        $group: {
          _id: '$subjectDetails.name',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        studentCount,
        teacherCount,
        classCount,
        attendanceRate,
        weeklyAttendance,
        classDistribution
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getRecentActivities = async (req, res) => {
  try {
    const recentAttendance = await ClassAttendance.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'classSchedule',
        populate: {
          path: 'teacher subject',
          select: 'user subject.name'
        }
      });

    const activities = recentAttendance.map(attendance => ({
      description: `Attendance taken for ${attendance.classSchedule.subject.name}`,
      user: attendance.classSchedule.teacher.user.firstName,
      timestamp: attendance.createdAt,
      status: 'completed'
    }));

    res.status(200).json({
      status: 'success',
      data: activities
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};