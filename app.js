const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const{blogmodel}=require("./model/blog")

const app = express()
app.use(cors())
app.use(express.json())
//encrypt function
mongoose.connect("mongodb+srv://ayshata2002:ayshata2002@cluster0.zqsv2.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")
const generateHashedPassword =async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

app.post("/sign-up",async(req,res)=>{
let input = req.body
let hashedPassword = await generateHashedPassword(input.password)
console.log(hashedPassword)
input.password = hashedPassword
let blog = new blogmodel(input)
blog.save()

    res.json({"status":"success"})
})

app.listen(8083,()=>{
    console.log("serverstrat")
})