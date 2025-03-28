const express = require('express')
const router = express.Router()
const Activity = require('./Schema/ActivitySchema')
const nodemailer = require('nodemailer')

// https://techfest-participants.vercel.app

https://techfest-participants.vercel.app//rani
router.post('/storeData',async(req,res)=>{
    try{
     const {email,name,year,department,activities} = req.body
     console.log('req.body',req.body) 
     const check = await Activity.findOne({email,name})
     console.log('check',check)  
        if(check){
            res.json({msg:'data already exist'})
        }
        
        else{
            const dataStored = await Activity.create({email,name,year,department,activities})
            if(dataStored){
                res.json({msg:'data stored successfully'})
            }
            else{
                res.json({msg:'data not stored,please try again'})
            }
        }
    
    }
    catch(e){
     console.log('server error in storedata',e)
     res.json({msg:'server error in submitting Activity'})
    }
})

router.get('/getData',async(req,res)=>{ 
    try{
        const data = await Activity.find()
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
           user: 'chanakyadassahu@gmail.com',
           pass:process.env.GMAIL_PASS
        }
     });

     const mailOptions = {
        from: 'chanakyadassahu@gmail.com',
        to: gmail,
        subject: 'Techfest-2025 OTP Verification : ',
        html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; position: relative;">
        <h2 style="color: #333;">Hello, Participant! 🎉</h2>
        <p style="font-size: 16px; color: #555;">
            Your OTP for <strong>Techfest-2025</strong> verification is:
        </p>
        <h1 style="color: #007BFF; font-size: 24px;">${OTP}</h1>
        <p style="font-size: 14px; color: #777;">
            Please use this code to complete your verification. This OTP is valid for a limited time.
        </p>
        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
        <br>
        <p style="font-size: 14px; color: #555; text-align: left;">Regards,<br>Chandani Sahu,<br>Co-Ordinator</p>
    </div>
`
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

router.put("/deleteActivity/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { activityToRemove } = req.body;
        console.log(id, activityToRemove)
  
        const updatedActivity = await Activity.findByIdAndUpdate(
            id,
            { $pull: { activities: activityToRemove } }, // Removes activity from array
            { new: true } // Returns updated document
        );
        console.log('updatedActivity',updatedActivity)
      if (!updatedActivity) {
        return res.json({ success: false, msg: "Delete Activity not found" });
      }
  
      res.json({ success: true, msg: "Activity deleted successfully" });
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.json({ success: false, msg: "Internal Server Error" });
    }
  });

  router.put('/updateActivity/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
        {
        if (!updatedActivity) {
            res.json({ success: false, msg: "Please ! Try Again" });
        }}
        
        res.json({ success: true, msg: "Activity Edited successfully" });

    } catch (error) {
        res.json({ msg: 'Error updating activity', error });
    }
});
module.exports = router