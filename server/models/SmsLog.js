const mongoose = require('mongoose');

const smsLogSchema = new mongoose.Schema(
  {
    classScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassSchedule',
    },
    attendanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassAttendance',
    },
    logs: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        parentName: {
          type: String,
          required: true,
        },
        parentNo: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['sent', 'failed'],
          required: true,
        },
        error: {
          type: String,
        },
        sentAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SmsLog = mongoose.model('SmsLog', smsLogSchema);
module.exports = SmsLog;