const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
    status: {
    type: String,
    enum: ['To do', 'In progress', 'Done'],
    default: 'To do',
  },
    dueDate: Date,
});

module.exports = mongoose.model("Task", taskSchema);
