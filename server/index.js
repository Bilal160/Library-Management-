import express from 'express'
import cors from 'cors';
import MongConnection from './db.js';
import dotenv from 'dotenv'
import authuser from './routes/auth.js'
import userdata from './routes/users.js'
import booksdata from './routes/books.js'
import rentbooksdata from './routes/rentbook.js'
// import reviewbooksdata from './routes/bookreview.js'

const app = express()

dotenv.config()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth',authuser)
app.use('/api/users',userdata)
app.use('/api/books',booksdata)
app.use('/api/rentbooks',rentbooksdata)
// app.use('/api/reviewbooks',reviewbooksdata)

// Databse Connection
try {
    MongConnection()
} catch (error) {
    console.log("Error While Connecting to Databse");
}

app.listen(process.env.PORT,()=>{
    
    console.log(`Server runing on http://localhost:${process.env.PORT}`);
})