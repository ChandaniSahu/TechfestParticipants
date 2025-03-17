const express = require('express')
const app = express()
const connectMongo = require('./db')
const router = require('./router')
const cors = require('cors')
const port = 3000
app.use(cors({ origin: "*" }));
app.use(express.json())

connectMongo()
app.use('/api',router)


app.listen(port,()=>{
 console.log('server is listening by Rani on port : ',port)
})