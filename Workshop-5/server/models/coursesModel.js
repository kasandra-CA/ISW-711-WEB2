const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
  name: { type: String },
  code: { type: String },
  description: { type: String },
  teacher: { type: Schema.Types.ObjectId, ref: "teachers" }  // Se asegura la relación con la colección teachers
});

module.exports = mongoose.model('courses', course);