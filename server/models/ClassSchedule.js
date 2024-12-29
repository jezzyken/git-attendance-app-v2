const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classScheduleSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    section: {
      type: String,
      required: true,
    },
    weekDays: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

classScheduleSchema.index({ teacher: 1, course: 1, subject: 1 });

module.exports = mongoose.model("ClassSchedule", classScheduleSchema);
