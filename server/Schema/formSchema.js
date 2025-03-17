const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
   email: { 
        type: String, 
        required: true 
    },
   activity: { 
        type: String, 
        required: true 
    },
   mode: { 
        type: String, 
        required: true 
    },
   Tname: { 
        type: String, 
        required: true 
    },
   TDes: { 
        type: String, 
        required: true 
    },
    members: { 
        type: [String], 
        required: true 
      }
   
})

const Form = new mongoose.model('formdata',FormSchema)
module.exports = Form