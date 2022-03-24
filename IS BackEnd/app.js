const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./ErrorHandler/ErrorResponse.js');
const routes = require('./Routes/index');

const host = 'localhost';
const port = 2020;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});

app.use('/',routes);


app.use(errorHandler);
app.use('/', (req, res) => {
	res.send('Welcome');
});


mongoose.connect('mongodb+srv://john:johnson2511@cluster0.jkud2.mongodb.net/Assignment6?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true } ).then(res=>{
    app.listen(port,host,()=>{
        console.log(`server is running at ${host}:${port}`);
    })
}).catch(err=>console.log(err));



