const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationLogSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    classSchedule: {
      type: Schema.Types.ObjectId,
      ref: "ClassSchedule",
      required: true,
    },
    type: {
      type: String,
      default: "ABSENCE_NOTIFICATION",
    },
    attendanceDate: {
      type: Date,
      required: true,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailSentAt: {
      type: Date,
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

notificationLogSchema.index({ student: 1, attendanceDate: 1 });
notificationLogSchema.index({ classSchedule: 1 });

module.exports = mongoose.model("NotificationLog", notificationLogSchema);
