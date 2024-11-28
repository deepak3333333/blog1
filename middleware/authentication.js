const { validateToken } = require("../services/authentication")


function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        //fetchin cookies
        const tokenCookieValue=req.cookies[cookieName]
        if(!tokenCookieValue){
            return next()
            
        }
        try{
            const userPayload=validateToken(tokenCookieValue)
            req.user=userPayload
            console.log(req.user,"this is user of middlewere");
            

        }
        catch(err){

        }
        return next()
        

    }
}
module.exports={checkForAuthenticationCookie}