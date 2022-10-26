import express from 'express';
import { signin,signup  } from '../controllers/users.js'

const router = express.Router();
router.get('/test', (req,res)=> { res.status(200).send("API is working properly")}); 
router.post('/signin', signin); 
router.post('/signup', signup); 

export default router;