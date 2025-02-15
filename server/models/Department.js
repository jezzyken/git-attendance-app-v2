const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'GIT'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);