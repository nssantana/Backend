const List = require('../models/listModel.js');
const Task = require('../models/taskModel.js');

exports.getList = async function (request, response) {
    const data = await List.find().populate('task');    
    return response.send(data);
}

exports.getListById = function (request, response) {
    return response.send( { nome: "Victor"} );
}

exports.newList = async (request, response) => {
    try {
        const data = await List.create({
            name: request.body.name,
            created: request.body.created
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
