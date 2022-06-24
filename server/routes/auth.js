import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router()

dotenv.config()
// User Register
router.post('/register', async (req,res)=>{
    const checkuser = await User.findOne({email:req.body.email})
    if(checkuser){
        return res.status(404).json("User Already Exist")
    }
    const salt = await bcrypt.genSalt(15)
    const hashpassword = await bcrypt.hash(req.body.password,salt)
    if(req.body.password !== req.body.confirmpassword) return res.status(401).json("Password not matched")
    try {
        const user = await User.create({
            username:req.body.username,
            email:req.body.email,
            password : hashpassword,
            profile:req.body.profile
        })
        res.status(200).json("User Registered")
    } catch (error) {
        // console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})
// User Login
router.post('/login', async (req,res)=>{
    try {
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({'success' : false,'message':"User Not Found"})
    }
    const comparepass = await bcrypt.compare(req.body.password,user.password)
    if(!comparepass){
        return res.status(401).json({'success' : false,'message':"Invalid Credentials"})
    }
    const data = 
        {
            id: user._id,
            isAdmin: user.isAdmin,
        }
        const token = jwt.sign(data,process.env.KEY)
        const {password , ...userdata} = user._doc
        res.status(200).json({'success' : true, ...userdata,token})
    } catch (error) {
        // console.log(error);
        return res.status(500).json({'success' : false,'message':"Server Error!!!"})
    }

})

export default router;