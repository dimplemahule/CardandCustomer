const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://LalitaMahule:lali123456789@cluster0.ypjvt.mongodb.net/CustomerandCard?retryWrites=true&w=majority",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDB is connected"))
.catch ( ( err => console.log(err)))



app.use('/', route);

app.listen(3000, () =>{
    console.log('Express is running on 3000 port');
})