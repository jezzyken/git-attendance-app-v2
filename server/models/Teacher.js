const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    employmentDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.pre('save', async function(next) {
  if (!this.department) {
    try {
      const Department = mongoose.model('Department');
      const defaultDept = await Department.findOne({ name: 'GIT' });
      
      if (defaultDept) {
        this.department = defaultDept._id;
      } else {
        const newDepartment = await Department.create({ name: 'GIT' });
        this.department = newDepartment._id;
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

teacherSchema.index({ teacherId: 1 });

module.exports = mongoose.model("Teacher", teacherSchema);
