const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const EmailTesterModel = require('../Models/EmailTester.js');
const router = new express.Router();


function countWords(str) {
    str = str.replace(/(^\s*)|(\s*$)/gi,"");
    str = str.replace(/[ ]{2,}/gi," ");
    str = str.replace(/\n /,"\n");
    return str.split(' ').length;
 }


router.get('/email_tester',async(req, res)=>{
    const Query = req.query.SearchedText;
    const ress=[];
    try{
        const response = await axios.get('http://emailsubjectlinegrader.com/home/analyze',{
            params: {text:Query}
        })
        const abc= await axios.get('https://sendcheckit.com/email-subject-line-tester-results',{
            params: {subject:Query}
        })
        const $ = cheerio.load(abc.data);

        var point = $('.points').find('strong').text();
        let reportSections= $('.report-sections');
        const fi= reportSections.find('li');
        fi.each((i,elements)=>{
            const tt = $(elements).find('h4').text();
            if(tt!==''){
                ress.push(tt);
            }
        })

        var sentiMent = ress[3].replace('Sentiment Analysis of All Marketing Emails','').trim().split(" ");
        var rglevel = ress[1].trim().split(" ");
        
        const newModel = new EmailTesterModel({

            SearchedText: Query,
            TotalScore: (response.data.TotalScore+parseInt(point))/2,
            Messages:response.data.Messages,
            PunctuationMessage: response.data.PunctuationMessage,
            scanability:{
                score: 8,
                average: 5,
                message: ress[0],
            },
            reading_grade_level: {
                score:rglevel[rglevel.length-3],
                message:ress[1],
            },
            length: {
                character : Query.length,
                word : countWords(Query),
                message : ress[2],
                LengthMessage: "it is short",
            },
            sentiment: {
                message : ress[3].replace('Sentiment Analysis of All Marketing Emails','').trim(),
                score: parseFloat(sentiMent[sentiMent.length - 1]),
            },
        
            Re: {
                message : ress[4],
            },
            free: {
                message : ress[5],
            },
            spammy_words: {
                message : ress[6],
            },
            bad_tab_words: {
                message : ress[7],
            },
            exclamation_mark : {
                message : ress[8],
            },
            allcaps_words : 
            {
                message : ress[9],
            },
            punctuation : 
            {
                message : ress[10],
            },
            personalization : 
            {
                message : ress[11],
            },
            question_in_subject : 
            {
                message : ress[12],
            },
            all_lowercase : 
            {
                message : ress[13],
            },
            emoji : 
            {
                message : ress[14],
            }
            
        })
        // newModel.save();
        res.send(newModel);
    }catch(e){
        console.log(e)
        res.status(404).json({message:e});
    }

})
module.exports = router;