require('dotenv').config()
const jwt= require('jsonwebtoken');
const User= require('../Models/Dataset.js');
const cookieParser = require('cookie-parser');
 
const Authenticate=async(req,res,next)=>{
    try{
        const verifyToken = jwt.verify(req.cookies.Engineerspoint,process.env.TOKENKEY);
        console.log(verifyToken._id);
        User.find({_id:verifyToken._id,"Tokens.token":req.cookies.Engineerspoint}, (err, user) => {
            if(err){
                throw new Error('user not found');
            }
            else{
                
                req.founduser = user[0];
                // console.log(req.founduser);
                req.founduser.name = user[0].name;
            }});
            next();
    }catch(err){
        res.status(404).send("unauthorised user");
        console.log(err);
    }

}
module.exports = Authenticate;