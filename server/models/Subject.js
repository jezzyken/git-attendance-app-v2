const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,
    },
    catNo: {
      type: String,
    },
    semester: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

subjectSchema.pre("save", function (next) {
  if (this.course && !Array.isArray(this.course)) {
    this.course = [this.course];
  }
  next();
});

module.exports = mongoose.model("Subject", subjectSchema);
