const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
  name: { type: String },
  code: { type: String },
  description: { type: String },
  teacher: { type: String }
});

module.exports = mongoose.model('courses', course);