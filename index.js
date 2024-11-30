const express=require("express")
const port=580
const path=require("path")

const userrouter=require("./routers/user")
const blogrouter=require("./routers/blog")

var cookieParser = require('cookie-parser')
const { default: mongoose } = require("mongoose")
const { checkForAuthenticationCookie } = require("./middleware/authentication")
const Blog = require("./models/blog")
mongoose.connect("mongodb://localhost:27017/blog1")
.then(()=>{
    console.log("connected")
})


const app=express()
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")


app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static('public'));

app.use("/user",userrouter)
app.use("/blog",blogrouter)

app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({})
    

    return res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})



app.listen(port,()=>{
    console.log("server is running")
})