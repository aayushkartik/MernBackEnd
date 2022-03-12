require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const CustomRouter = require('./Routes/routes.js')
const CustomQuestionRouter = require('./Routes/QuestionRoute.js')
const EmailTesterRouter = require('./Routes/EmailTesterRoute.js')
const app = express();

app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}));
app.use(cookieParser());
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/mernset", {useNewUrlParser: true, useUnifiedTopology: true});


app.use(CustomRouter);
app.use(CustomQuestionRouter);
app.use(EmailTesterRouter);

port = process.env.PORT || 8080;
// mongodb://localhost:27017/Mset
app.listen(port, function (req,res) {
    console.log('listening on port 8080');
});