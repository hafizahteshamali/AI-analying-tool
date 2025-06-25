import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/AuthRoutes.js';
import DbConnection from './Database/Connection.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.status(200).send({message: "Welcome to Backend"});
})

app.use('/api/auth', authRoutes)
DbConnection()

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT);
})