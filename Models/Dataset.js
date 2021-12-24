require('dotenv').config()
const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const postSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    work: String,
    password: String,
    Tokens:[{token:String}]
});

postSchema.pre("save", async function(next){
    console.log("Saving");
    if(this.isModified("password"))
    {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
}); 
postSchema.methods.generateAuthToken = async function(){
    try{
        let token= jwt.sign({_id:this._id},process.env.TOKENKEY);
        this.Tokens= this.Tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const postModel = new mongoose.model('PostModel',postSchema);
module.exports = postModel;