const express = require('express')
const app = express()
const connectMongo = require('./db')
const router = require('./router')
const cors = require('cors')
const port = 3000
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://mseit-techfest-2025-participate.netlify.app');
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
app.use(express.json())

connectMongo()
app.use('/api',router)


app.listen(port,()=>{
 console.log('server is listening by Rani on port : ',port)
})