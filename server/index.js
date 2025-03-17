const express = require('express')
const app = express()
const connectMongo = require('./db')
const router = require('./router')
const cors = require('cors')
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/api',router)
connectMongo()

app.listen(port,()=>{
 console.log('server is listening by Rani on port : ',port)
})