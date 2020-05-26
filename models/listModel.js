const mongoose = require('mongoose');
const Task = require('./taskModel.js');

let listSchema = mongoose.Schema({
    name: String,
    created: Date,
    task: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Task'
    }]
}, { collection: 'list' });

let listModel = mongoose.model('List', listSchema);

module.exports = listModel;

