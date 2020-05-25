const List = require('../models/listModel.js');

exports.getList = async function (request, response) {
    const data = await List.find();    
    return response.send(data);
}

exports.getListById = function (request, response) {
    return response.send( { nome: "Victor"} );
}

exports.newList = async function (request, response) {
    try {
        const data = await List.insertMany({ name: "todo2", created: new Date().toLocaleString() });        
        return response.send( { success: true, list: data });    
    } catch (error) {
        return response.status(400).send( { success: false, error: error });    
    }
}