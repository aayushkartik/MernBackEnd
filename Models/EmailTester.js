
const mongoose =require('mongoose');
const EmailTesterSchema = new mongoose.Schema({
    SearchedText: String,
    TotalScore: String,
    Messages:[],
    PunctuationMessage: String,
    scanability:{
        score: Number,
        average: Number,
        message: String,
        definition: {type:String, default:"It's a measure of how easy-breezy it is to read your subject line. Don't shy away from using well known industry specific terms, just don't make it complicated."},
        best_practise:{type:String, default:"Average: 5 (lower is better)"},
    },
    reading_grade_level: {
        score:String,
        average:{type:String, default:"7th Grade Level"},
        message:String,
        definition: {type:String, default:"Reading Grade Level is a mixture of word choice, complexity and length. Writing at a lower level tends to generate more opens"},
        best_practise:{type:String, default:"Average: 7th Grade Level (lower is better"},
    },
    length: {
        character : Number,
        word : Number,
        message : String,
        definition: {type: String, default:"How many words in your subject is less important than the right words. Keep it specific. Focus on what your reader will get out of opening this email.  Just don't make it too short (hurts opens) and if you go long, try and put multiple CTAs or value propositions into the subject."},
        LengthMessage:String,
        definition: {type:String, default:"Research has shown that approximately 50 – 65 character length is ideal. Perhaps make your headline a bit longer"},
        best_practise:{type:String, default:"52 characters in 8 words"},
    },
    sentiment: {
        message : String,
        score: Number,
        definition: {type:String, default:"Sentiment scores below -0.25 are negative and above 0.25 positive. 76% emails are Positive or Neutral 24% are negative 31% are neutral 45% are positive"},
        best_practise : {type:String, default:"Average is 0.15"}
    },

    Re: {
        message : String,
        definition: {type:String, default:"Putting a fake RE: or FWD: at the beginning of your subject may temporarily boost open rates, but is not recommended unless you're actually responding to an email. Many email clients and anti-spam systems have begun flagging these as suspicious.."},
        best_practise: {type:String, default:"A pititful number of emails (1.07%) start with RE: or FWD:"},
    },
    free: {
        message : String,
        definition: {type:String, default:"Spammers and low rent marketers have so over used `Free` in email subject lines that it's best to avoid it if at all possible."},
        best_practise: {type:String, default:"Only 2.34% of emails contain the word 'free'."}
    },
    spammy_words: {
        message : String,
        definition: {type:String, default:"Obviously there are words and phrases found more often in spam emails. While using these won't automatically put your email into the spam bin, it's best to avoid them if you can."},
        best_practise: {type:String, default:"6.49% contain something likely to get them marked as spam."}
    },
    bad_tab_words: {
        message : String,
        definition: {type:String, default:"Sometimes added to give a sense of urgency to your email, these word choices are likely to work gainst you. Often they'll push your email from the Primary to the Promotions tab in Gmail and generally hurt open rates."},
        recommendation :{type:String, default: "replace 'quick' in your subject."},
        best_practise: {type:String, default:"14.21% of emails contain something that may hurt their tab placement rates."}
    },
    exclamation_mark : {
        message : String,
        definition : {type:String, default:"Exclamation marks tend to hurt open rates and Gmail tab placement, avoid them."},
        best_practise : {type:String, default:"12.36% of emails are overly excited."}
    },
    allcaps_words : 
    {
        message : String,
        definition : {type:String, default:"Subject lines with all cap words both look like they're shouting and like you are a spammer."},
        best_practise : {type:String, default:"9.37% of emails contain an all-caps word."}
    },
    punctuation : 
    {
        message : String,
        "definition" : {type:String, default:"Swearing like a cartoon sailor isn't something you should aspire to, in life or your subject lines. Remove some punctuation from your subject."},
        "best_practise" : {type:String, default:"Best practice emails: 0.34% contain excessive punctuation."}
    },
    personalization : 
    {
        message : String,
        definition : {type:String, default:"Most marketers do any personalization, but personalization can both be much more and much more effective.  Try personalizing your subject with name, industry, title, interest, or geograpic info."},
        best_practise: {type:String, default:"1.42% of emails contain subject personalization."}
    },
    question_in_subject : 
    {
        message : String,
        definition : {type:String, default:"If you're struggling with creating a compelling subject line, try a question. They're more naturally engaging and typically result in higher open rates."},
        subject_idea : {type:String, default:"Try rephrasing your subject as a query to increase engagement."},
        best_practise : {type:String, default:"10.48% of email subjects are questions."}
    },
    all_lowercase : 
    {
        message : String,
        definition : {type:String, default:"Lowercasing your entire subject is a stylistic choice that can make your subject stand out in a crowded inbox. It can be a good way to signal that it's a more personal, less corporate message."},
        best_practise : {type:String, default:"0.86% email subjects are entirely lowercased."}
    },
    emoji : 
    {
        message : String,
        definition : {type:String, default:"Thowing a few topical emoji into your email's subject line is an easy way to catch the eye. Copy and Paste from GetEmoji.com"},
        best_practise : {type:String, default:"2.50% of subjects contain emoji today."}
    }

});
const EmailTesterModel = mongoose.model("Email_Tester_Record",EmailTesterSchema);
module.exports=EmailTesterModel;