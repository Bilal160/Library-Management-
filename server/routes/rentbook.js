import express from 'express';
import { VerifyToken, VerifyTokenandAdmin } from '../middlewares/VerifyTokenandAuth.js';
import RentBook from '../models/RentBook.js';

const router = express.Router()

router.post('/onrent', VerifyToken, async (req, res) => {
    const { bookid } = req.body
    try {
        const rentbook = await RentBook.create({
            userid: req.user.id,
            bookid
        })
        rentbook.save()
        res.status(200).json("Book has been Requested for Rent!...")
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

router.get('/allrentrequests', VerifyTokenandAdmin, async (req, res) => {
    try {
        const rentbooks = await RentBook.find()
        res.status(200).json(rentbooks)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

export default router;