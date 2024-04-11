import './src/config/env.config.js';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDB } from './src/config/mongoose.config.js';
import userRouter from './src/features/user/user.route.js';
import studentRouter from './src/features/student/student.route.js';
import companyRouter from './src/features/company/company.routes.js';
import mongoose from 'mongoose';
import session from 'express-session'
import jwtAuth from './src/middleware/jwtAuth.middleware.js';
import { ApplicationError } from './src/Error-handler/applicationerror.js';

const server= express();
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

//Employee routes
server.use('/api/user',userRouter);
server.use('/api/student',jwtAuth,studentRouter);
server.use('/api/company',jwtAuth,companyRouter);

//middleware to handle 404 error
server.use((req, res) => {
    res.status(404).send("API not found")
})
server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        res.status(400).send(err.message);
    }
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    //server errors.
     res.status(500).send("Something went wrong, try again later");
});

//port and staring the server
server.listen(process.env.PORT,()=>{
    console.log("Server is running at ", process.env.PORT)
    connectToDB();
})