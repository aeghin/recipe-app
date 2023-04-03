import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';


const router = express.Router();

router.post('/register', async (req, res) => {

    // essentially req.body.username to find the user
    const { username, password } = req.body;
     
    // assigning username to variable and using mongoose to 
    const user = await UserModel.findOne({ username })

    if (user) {
        return res.json({ message: 'User already exists'})
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword});
    await newUser.save();

    
    res.json({ message: "User registered sucessfully!"});
});

router.post('login')

export { router as userRouter };