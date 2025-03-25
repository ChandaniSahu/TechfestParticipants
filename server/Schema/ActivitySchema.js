const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    email: {
      type: String,
     
    },
    name: {
      type: String,
     
    },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th"],
     
    },
    department: {
      type: String,
      enum: ["CSE", "Aero", "Mech", "Civil", "Mining"],
     
    },
    activities: [ ],
      
   
   
  });
  
  const Activity = mongoose.model("Activity1", ActivitySchema);
  module.exports = Activity;