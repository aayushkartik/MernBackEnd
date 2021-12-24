require('dotenv').config()
const jwt= require('jsonwebtoken');
const User= require('../Models/Dataset.js');
 
const Authenticate=async(req,res,next)=>{
    try{
        const token= req.cookies.Engineerspoint;
        const verifyToken = jwt.verify(token,process.env.TOKENKEY);
        const rootUser = User.findOne({_id:verifyToken._id, "Tokens.tooken": token});
        if(!rootUser){
            throw new Error('user not found');
        }
        req.token = token;
        req.founduser = rootUser;
        next();

    }catch(err){
        res.status(404).send("unauthorised user");
        console.log(err);
    }

}
module.exports = Authenticate