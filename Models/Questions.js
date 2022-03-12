require('dotenv').config()
const mongoose =require('mongoose');
const questionSchema = new mongoose.Schema({
    question: String,
    postedBy: String,
    postedByID:String,
    postedOn: String,
    Answers:[{answer:String, answeredBy:String,AnsweredOn:String}]
});
const questionModel = mongoose.model("question",questionSchema);
module.exports= questionModel;