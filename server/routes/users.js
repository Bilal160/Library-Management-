import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { VerifyToken, VerifyTokenandAdmin, VerifyTokenandAuthorization } from '../middlewares/VerifyTokenandAuth.js';

const router = express.Router()

router.put("/:id", VerifyTokenandAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(401).json("User Not Found!!!")

        if (req.body.password) {
            const salt = await bcrypt.genSalt(15)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const updateduser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        updateduser.save()
        res.status(200).json("User has been Updated!...")
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", VerifyTokenandAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json("User Not Found")
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/allusers', VerifyTokenandAdmin, async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json("Server Error")
    }

})
router.post('/user', VerifyToken, async (req, res) => {
    try {
        const userid = req.user.id
        const users = await User.findById(userid).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json("Server Error")
    }

})

export default router;