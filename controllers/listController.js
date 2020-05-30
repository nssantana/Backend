const List = require('../models/listModel.js');
const Task = require('../models/taskModel.js');

exports.getList = async function (request, response) {
    const data = await List.find().populate('task');    
    return response.send(data);
}

exports.getListById = async function (request, response) {
    try {
        const data = await List.findById( { _id: request.params.list}).populate('task')
        return response.json({list: data})   
    } catch (error) {
        return response.json({success: false, error: error.message});  
    }
}

exports.newList = async (request, response) => {
    try {
        const data = await List.create({
            name: request.body.name,
            created: new Date()
        });

        if (request.body.task) {
            const task = await Task.create(request.body.task);    
            await List.updateOne({ _id: data._id }, 
                { $push: { task: { $each: task } } },    
                { new: true }
            );
        }   
        
        return response.json({ success: true, list: data });
    } catch (error) {
        return response.json({success: false, error: error.message});   
    }
}

exports.addTaskToList = async (request, response) => {
    try {   
        const task = await Task.create(request.body.task);

        await List.findOneAndUpdate({ _id: request.params.list }, 
            { $push: { task: { $each: task } } },    
            { new: true }
        );      
        
        return response.json({ success: true, tasks: task });
    } catch (error) {
        return response.json({ success: false, error: error.message });   
    }
}

exports.removeTask = async (request, response) => {
    try {   
        await List.findOneAndUpdate({ _id: request.params.list }, 
            { $pull: { task: request.params.task} }  
        );

        const task = await Task.findByIdAndRemove(request.params.task);
        
        return response.json({ success: true, task: task });
    } catch (error) {
        return response.json({ success: false, error: error.message });   
    }
}

exports.removeList = async (request, response) =>{
    try {   
        const data = await List.findById( { _id: request.params.list}).populate('task')
        if (data.task) {
            data.task.forEach(async (task) => {
                await Task.deleteOne({_id:task._id})
            });
        }    
        await data.delete()
        return response.json({ success: true, list: data });
    } catch (error) {
        return response.json({ success: false, error: error.message });   
    }
}