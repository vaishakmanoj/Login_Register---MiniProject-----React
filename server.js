const express = require('express')
const app = express()
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')
// when ever the api is having the variables to destructure from the client that means the login will send the 
// username and password in the format of json format so to destructre the json use the code 
app.use(express.json())
//then only it will be destructured

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started At Port ${port}`));
