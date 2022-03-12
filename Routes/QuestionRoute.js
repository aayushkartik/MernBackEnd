const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const mongoose =require('mongoose');
const User= require('../Models/Dataset.js');
const authenticate= require('../Middleware/Authenticate.js')
const QuestionModel = require('../Models/Questions.js');

const router = new express.Router();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();

router.post('/postquestion', authenticate, (req, res)=> {
    const date = d.getDate()+ " " +months[d.getMonth()]+" "+d.getFullYear();
    QuestionModel.find({question:_.lowerCase(req.body.question)+'?'},(err,found)=> {
        if(err) {
            res.status(404);
        }
        else{
            if(found.length === 0) {
            const newQuestion = new QuestionModel({
                question: _.lowerCase(req.body.question)+'?',
                postedBy:req.founduser.name,
                postedByID:req.founduser._id,
                postedOn: date
            });
            console.log(newQuestion);
            newQuestion.save();
            req.founduser.Questions.push({questions:_.lowerCase(req.body.question)+'?'});
            req.founduser.save();
            res.send("questions posted successfully");
        }
        else{
            res.send("Question already existed").status(403);
        }
        }
    });
});

router.post('/postanswer',authenticate,async (req, res)=>{
    const date = d.getDate()+ " " +months[d.getMonth()]+" "+d.getFullYear();
    const questioname = req.query.questionName+'?';
    console.log(questioname);
    console.log(req.body.answer);
    QuestionModel.findOne({question:questioname},(err,foundquestion)=>{
        if(err){
            res.send(err);
        }
        foundquestion.Answers.push({answer:req.body.answer,answeredBy: req.founduser.name, AnsweredOn:date});
        foundquestion.save();
        res.send('successful');
    });
});

router.get('/question', (req,res)=>{
    const name= (req.query.questionName)+'?';
    QuestionModel.findOne({question:name},(err,foundquestion)=>{
        if(err){
            res.send(err);
        }
        res.send(foundquestion);
    });
});




module.exports = router;
