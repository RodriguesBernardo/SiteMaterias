const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
