const express = require('express')
const router = express.Router()
const Form = require('./Schema/formSchema')

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

module.exports = router