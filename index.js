const express = require('express');
const app = express();
const routes = require('./routes/listRoute.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb://localhost:27017/todo', { 
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() => {
    console.log("Connectou ao banco");
}).catch((err) => {
    console.log(err);
}) 

app.use(routes);
app.use(bodyParser.json());

const port = process.env.NODE_ENV === "dev" ? 8000 : process.env.PORT;

app.listen(port, function () {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
})
