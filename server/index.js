import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';


const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.json({limit: "30mb",extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended:true}));

app.use('/posts', postRoutes);

const DB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=> app.listen(PORT,()=> console.log(`listening on port : ${PORT}`)))
    .catch(err => console.error(err.message));

