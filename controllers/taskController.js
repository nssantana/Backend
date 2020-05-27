const Task = require('../models/taskModel.js');

exports.switchTaskStatus = async (request, response) => {
    try {
        let task = await Task.findOne( { _id: request.params.task });
        task.completed = !task.completed;
        taskUpdated = await task.save();
        return response.json({ success: true, task: taskUpdated });
    } catch (error) {
        return response.json({ success: false, error: error.message });
    }    
}