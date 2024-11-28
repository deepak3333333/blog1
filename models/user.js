const { default: mongoose } = require("mongoose");
const {randomBytes,createHmac}=require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema=new mongoose.Schema({
    username:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    salt:{
        type:String

    },
    profileImageUrl:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
   
    
},{timestamps:true})


userSchema.pre("save",function(next){
    const user=this
    const salt=randomBytes(16).toString("hex")
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex")
    user.salt=salt
    user.password=hashedPassword
    next()


    
})
userSchema.static("matchPasswordGenerateToken",async function(email,password){
    const user=await this.findOne({email})
    if(!user) throw new Error("user not found")
    const salt=user.salt
    const hashedPassword=user.password
    const userProvidhashed=createHmac("sha256",salt).update(password).digest("hex")
    if(hashedPassword!==userProvidhashed) throw new Error("password is incorrect")
    const token=createTokenForUser(user)
return token 

})


const User=mongoose.model("User",userSchema)

module.exports=User