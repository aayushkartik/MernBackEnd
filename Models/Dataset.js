require('dotenv').config()
const mongoose =require('mongoose');
const passportLocalMongoose  = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,

    password: String,
    Tokens:[{token:String}],
    Questions:[{questions:String}]
});

userSchema.pre("save", async function(next){
    console.log("Saving");
    if(this.isModified("password"))
    {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
}); 
userSchema.methods.generateAuthToken = async function(){
    try{
        let token= jwt.sign({_id:this._id},process.env.TOKENKEY);
        this.Tokens= this.Tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const postModel = new mongoose.model('PostModel',userSchema);
module.exports = postModel;