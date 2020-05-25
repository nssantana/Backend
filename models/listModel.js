const mongoose = require('mongoose');

let listSchema = mongoose.Schema({
    name: String,
    created: Date
}, { collection: 'list'});

let listModel = mongoose.model('List', listSchema);

module.exports = listModel;

