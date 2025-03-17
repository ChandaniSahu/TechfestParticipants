const mongoose = require("mongoose")
require('dotenv').config()
const URI = process.env.MONGO_URI 

const connectMongo = async () =>{
    try{
    await mongoose.connect(URI);
    console.log("connection stablished successfully")
    }
    catch(error){
        console.error("database connection failed ",error);
        process.exit(0);
    }
}

module.exports=connectMongo;