require('dotenv').config();
const express = require('express');
const User= require('../Models/Dataset.js');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const authenticate= require('../Middleware/Authenticate.js');
const QuestionModel = require('../Models/Questions.js');
const questionModel = require('../Models/Questions.js');
const router= new express.Router();

router.get('/', (req, res) => {
        questionModel.find({},(err, data) => {
            if(err) {
                send.status(404).json({message:'No user records avaliable'})
            }
            else{
                res.send(data);
            }
        });
});

router.get('/api/postdatas', (req, res) => {
    User.find({},function(err, values) {
        res.send(values)
    });
});

router.post("/register", async (req, res) => {
    const{name,email,phone,work,password}= req.body;

    // if(!name || !email  || !password){
    //     return res.status(402).json({message:"plz correctly fill the data"});
    // }
    try{
        const existUser = await User.findOne({email: req.body.email});
        if(existUser){
            return res.status(402).json({message:"user already existed"})
        }
        const newUser = new User({
            name:name,
            email:email,
            phone:phone,
            work:work,
            password:password
        });
        await newUser.save();
        res.status(200).json({message:"user registered successfully"});
    }catch(err){
        console.log(err);
    }
});

router.post("/login", async(req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(402).json({message:"plz correctly fill the data"});
    }
    try{
        const founduser = await User.findOne({ email: email});
        if(founduser){
            const isMatch = await bcrypt.compareSync(password, founduser.password);
            const token = await founduser.generateAuthToken();
            res.cookie('Engineerspoint', token,{
                httpOnly: true
            });
            if(isMatch){
                res.status(200).json({message:"user logged in successfully"});
            }
            else{   
                res.status(403).json({error:"Invalid credentials"});
            }
        }
    }catch(err) {
        console.log(err);
    }
});
router.get('/isLoggedin',(req, res)=>{
    const Cookie = req.cookies.Engineerspoint;
    if(!Cookie){
        res.status(403).json({message:"no cookie found"});
    }
    const verifyToken = jwt.verify(req.cookies.Engineerspoint,process.env.TOKENKEY);
    User.find({_id:verifyToken._id,"Tokens.token":req.cookies.Engineerspoint}, (err, user) => {
        if(err){
            console.error(err);
        }
        else{
            res.send(user)
        }});
});

router.get('/about',authenticate,(req, res)=>{   
    console.log(req.founduser);
    res.send(req.founduser);
});


module.exports =router;