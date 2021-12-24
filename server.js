require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const CustomRouter = require('./Routes/routes.js')
const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(CustomRouter);

app.listen(8080, function (req,res) {
    console.log('listening on port 8080');
});