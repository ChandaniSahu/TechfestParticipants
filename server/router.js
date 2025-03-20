const express = require('express')
const router = express.Router()
const Form = require('./Schema/formSchema')
const nodemailer = require('nodemailer')

// https://techfest-participants.vercel.app


router.post('/storeData',async(req,res)=>{
    try{
     const {email,activity,Tname,TDes,mode,members} = req.body
     console.log('req.body',req.body) 
     const check = await Form.findOne({email,activity,members})
     console.log('check',check)  
        if(check){
            res.json({message:'data already exist'})
        }
        else{
            const form = await Form.create({email,activity,Tname,TDes,mode,members})
            if(form){
                res.json({message:'data stored successfully'})
            }
            else{
                res.json({message:'data not stored'})
            }
        }
    
    }
    catch(e){
     console.log('server error in storedata',e)
    }
})

router.get('/getData',async(req,res)=>{ 
    try{
        const data = await Form.find()
        if(data){
            console.log('data',data)
            res.json(data)
        }
        else
       console.log('data not found') 
    }
    catch(e){
        console.log('error in getdata',e)
    }
})

router.post('/generateOTP',async (req,res)=>{
    const { gmail } = req.body 

    OTP = Math.floor(Math.random() * 1000000).toString();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           user: 'rrrsahu2005@gmail.com',
           pass:process.env.GMAIL_PASS
        }
     });

     const mailOptions = {
        from: 'rrrsahu2005@gmail.com',
        to: gmail,
        subject: 'Techfest-2025 OTP Verification : ',
        html: `<h1>Hello, Participants</h1><br/>
    <p>Your OTP for <strong>Techfest-2025</strong>
     verification is: <b>${OTP}</b>. 
     Please use this code to complete your verification.</p>`

     };

     const response = await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           console.error(error);
        } else {
           console.log('Email sent: ' + info.response);
           res.json({otp:OTP})
        }

     });
})

module.exports = router