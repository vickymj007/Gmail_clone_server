const express = require("express")
const cors = require('cors')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./Routes/userRoutes.js')

dotenv.config()


app.use(cors({
    origin: true, 
    credentials: true, 
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.status(200).json({msg:"Welcome to the Gmail Clone app"})
})



app.use('/api/users', userRoutes)

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("Connected to MongoDB");

        app.listen(process.env.PORT,()=>{
            console.log("Server is Listening");
        })
    } catch (error) {
        console.log({msg:"Unable to Connect to the Database", error:error.message});
    }
}

connectDB()
