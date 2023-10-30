const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  parent_category: {
    type: String,
    default: undefined
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});

questionSchema.index({category: 1, content: 1}, {unique: true})
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;