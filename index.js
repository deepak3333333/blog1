const express=require("express")
const port=580
const userrouter=require("./routers/user")
var cookieParser = require('cookie-parser')
const { default: mongoose } = require("mongoose")
const { checkForAuthenticationCookie } = require("./middleware/authentication")
mongoose.connect("mongodb://localhost:27017/blog1")
.then(()=>{
    console.log("connected")
})


const app=express()
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use("/user",userrouter)
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))



app.get("/",(req,res)=>{
    return res.render("home",{
        user:req.user
    })
})


app.listen(port,()=>{
    console.log("server is running")
})