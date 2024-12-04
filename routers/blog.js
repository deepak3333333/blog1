const { Router } = require("express");


const Blog = require("../models/blog");
const multer = require("multer");
const router = Router();

const path = require("path");
const User = require("../models/user");
const Comment = require("../models/comment");
const { log } = require("console");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});
router.post("/", upload.single("coverImageUrl"), async (req, res) => {
    const { title, body } = req.body;

    console.log(req.file);

    const blog = await Blog.create({
        title,
        body,
        coverImageUrl: `/uploads/${req.file.filename}`, // Corrected path
        createdBy: req.user.id,
    });
    return res.redirect("/");
});
router.get("/:id", async (req, res) => {
    
const blog= await Blog.findById(req.params.id).populate("createdBy")
const comments = await Comment.find({blogId: req.params.id} ).populate("commentBy")
    
    


return res.render("blog",{blog, user:req.user,comments})
    
})
router.post("/comment/:blogId",async(req,res)=>{
    console.log(req.params.blogId);
    
    
   
    const data1=await Comment.create({
        content:req.body.content,
        commentBy:req.user.id,
        blogId:req.params.blogId
    })
return res.redirect(`/blog/${req.params.blogId}`)

    
})

module.exports = router;
