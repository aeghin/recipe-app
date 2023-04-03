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

    //almost like validation to check if user exists otherwise won't move on.
    if (user) {
        return res.json({ message: 'User already exists'})
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    // saving new user with .save() method.
    const newUser = new UserModel({ username, password: hashedPassword});
    await newUser.save();

    // send this as a response.
    res.json({ message: "User registered sucessfully!"});
});

router.post('login')

export { router as userRouter };