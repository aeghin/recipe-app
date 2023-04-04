// framework to create API. Serves front-end
import express from 'express';
// ruleset between front-end and back-end
import cors from 'cors';
// ORM for MongoDB. Communicate with DB.
import mongoose from 'mongoose';


import { userRouter } from './routes/users.js';

const PORT = 3001;

const app = express();


//middleware
app.use(express.json());
app.use(cors());

// applies to the URL 
app.use('/auth', userRouter)

// connection to mongoose
mongoose.connect('mongodb+srv://edwxrd:mernapp123@recipes.xk9ucsi.mongodb.net/recipes?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
})