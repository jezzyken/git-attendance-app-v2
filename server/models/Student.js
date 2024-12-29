const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  parentNo: {
    type: String,
    required: true
  },
  parentAddress: {
    type: String,
    required: true
  },
  parentEmail: {
    type: String,
    required: true,
    lowercase: true
  }
}, {
  timestamps: true
});

studentSchema.index({ studentId: 1 });

module.exports = mongoose.model('Student', studentSchema);