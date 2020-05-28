const express = require('express');
const app = express();
const routes = require('./routes/listRoute.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const host = (process.env.NODE_ENV==="dev") ? 'mongodb://localhost:27017/todo': process.env.MONGO_STRING

mongoose.connect('mongodb://localhost:27017/todo', { 
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() => {
    console.log("Connectou ao banco");
}).catch((err) => {
    console.log(err);
}) 

app.use(bodyParser.json());
app.use(routes);

const port = process.env.NODE_ENV === "dev" ? 8000 : process.env.PORT;

app.listen(port, function () {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})
