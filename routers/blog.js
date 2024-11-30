const { Router } = require("express");

const Blog = require("../models/blog");
const multer = require("multer");
const router = Router();

const path = require("path");

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

module.exports = router;
