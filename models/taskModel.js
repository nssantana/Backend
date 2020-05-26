const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    name: String,
    description: String,
    completed: { type: Boolean, default: false }    
}, { collection: 'task'});

let taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;