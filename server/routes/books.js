import express from 'express';
import { VerifyToken, VerifyTokenandAdmin } from '../middlewares/VerifyTokenandAuth.js';
import Books from '../models/Books.js';

const router = express.Router()

router.post('/addbook', VerifyTokenandAdmin, async (req, res) => {
    const { adminid, title, description, rent, image, category, author } = req.body
    try {
        const book = await Books.create({
            adminid: req.user.id,
            title,
            description,
            rent,
            image,
            category,
            author
        })
        res.status(200).json("Book has been added!...")
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

router.put('/:id', VerifyTokenandAdmin, async (req, res) => {
    try {
        const book = await Books.findById(req.params.id)
        if (!book) return res.status(401).json("Book Not Found!!!")

        const updatedbook = await Books.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        updatedbook.save()
        res.status(200).json("Book has been Updated!...")
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

router.delete('/:id', VerifyTokenandAdmin, async (req, res) => {
    try {
        const book = await Books.findById(req.params.id)
        if (!book) return res.status(401).json("Book Not Found!!!")

        const updatedbook = await Books.findByIdAndDelete(req.params.id)
        res.status(200).json("Book has been Deleted!...")
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

router.get('/allbooks', async (req, res) => {
    try {
        const books = await Books.find()
        res.status(200).json(books)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

router.get('/allbooks/:id', async (req, res) => {
    try {
        const book = await Books.findById(req.params.id)
        if (!book) return res.status(401).json("Book Not Found!!!")
        const getbook = await Books.findOne({id:req.params.id})
        const {adminid , ...others} = getbook._doc
        res.status(200).json(others)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error!!!")
    }

})

export default router;