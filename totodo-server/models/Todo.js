const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
},{ timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);