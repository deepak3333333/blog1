const { Router } = require("express");
const Blog = require("../models/blog");
const router=Router()




router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })
      
})
router.post("/",async(req,res)=>{
    const {title,body,coverImageUrl}=req.body
    const newBlog=await Blog.create({
        title,body,coverImageUrl,createdBy: req.user._id
    })
   
    return res.redirect("/")
    
})

module.exports= router







