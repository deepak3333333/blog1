const {Router}=require("express")
const User = require("../models/user")


const router=Router()


router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body
    await User.create({
        username,
        email,
        password
    })
    return res.redirect("/")

    
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})
router.get('/signin',(req,res)=>{
    return res.render("signin")
})
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body
    try{
        const token=await User.matchPasswordGenerateToken(email,password)
    return res.cookie("token",token).redirect("/")

    }
    catch(err){
        return res.render("signin",{error:"incoreect user and password"})
    }
    


})

module.exports=router