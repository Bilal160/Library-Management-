import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

export const VerifyToken = (req,res,next)=>{
    const token = req.header('auth-token')
    if (token) {
        jwt.verify(token,process.env.KEY,(err,user)=>{
            if (err) return res.status(404).json("Not Valid Token")
            req.user = user
            next()
        })
    }else{
        return res.status(404).json("Not Authorized")
    }
}

export const VerifyTokenandAdmin = (req,res,next)=>{
    VerifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(401).json("You are not alowed to do that!")
        }
    })
}

export const VerifyTokenandAuthorization = (req,res,next)=>{
    VerifyToken(req,res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
          } else {
            res.status(403).json("You are not alowed to do that!");
          }
        });
}