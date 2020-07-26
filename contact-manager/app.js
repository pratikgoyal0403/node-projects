const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoute = require('./Routes/contact');
const authRoute = require('./Routes/auth');

const app =  express();

const URI = 'mongodb+srv://pratik:pratikgoyal@cluster0-mlvox.mongodb.net/contact-manager-api';

app.use(cors());
app.use(express.json());

app.use(contactRoute);
app.use(authRoute);

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    app.listen(5000, ()=>{
        console.log('server is running on port 5000');
    });
})
