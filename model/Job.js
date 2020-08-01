const mongoose = require('mongoose');

// Create Schema
const JobSchema = mongoose.Schema({
  jobtitle: {
    type: String,
    require: true,
  },
  jobdescription: {
    type: String,
    require: true,
  },
  skillsrequire: {
    type: String,
    require: true,
  },
  budget: {
    type: Number,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Jobs', JobSchema);
