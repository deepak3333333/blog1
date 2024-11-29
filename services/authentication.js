const JWT=require("jsonwebtoken")

const secret="secret@123321@9487"
function createTokenForUser(user){
    const payload={
        id:user._id,
        user:user.username,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role
    }
    const token=JWT.sign(payload,secret)
return token
}
function validateToken(token){
    const payload=JWT.verify(token,secret)
    
    
    return payload

}
module.exports={
    createTokenForUser,
    validateToken
}
