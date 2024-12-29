const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classAttendanceSchema = new Schema(
  {
    classSchedule: {
      type: Schema.Types.ObjectId,
      ref: "ClassSchedule",
      required: true,
    },
    attendanceDate: {
      type: String,
      required: true,
    },
    daysOfWeek:{
      type: String,
    },
    attendanceRecords: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["present", "absent", "late", "excused"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClassAttendance", classAttendanceSchema);
