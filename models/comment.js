const { default: mongoose, Schema } = require("mongoose");

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    commentBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const  Comment = mongoose.model("comment",commentSchema)
module.exports = Comment