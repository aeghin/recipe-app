import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';


const router = express.Router();

router.post('/register', async (req, res) => {

    // essentially req.body.username to find the user
    const { username, password } = req.body;

    // assigning username to variable and using mongoose to 
    const user = await UserModel.findOne({ username });

    // almost like validation to check if user exists otherwise won't move on.
    if (user) {
        return res.json({ message: 'User already exists' });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    // saving new user with .save() method.
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    // send this as a response.
    res.json({ message: "User registered sucessfully!" });


});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // find user again
    const user = await UserModel.findOne({ username });

    // if user is not found, send this
    if (!user) {
        return res.json({ message: "User doesn't exist" })
    };

    // using bcrypt to validate password.
    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
        return res.json({ message: "password is incorrect" });
    };

    // using jwt first time
    const token = jwt.sign({ id: user._id }, "secret");

    //sending back the token and userID
    res.json({ token, userID: user._id });


});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403);
            next();
        })
    } else {
        res.sendStatus(401)
    }
}