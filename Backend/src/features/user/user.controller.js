import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';
import session from "express-session";

export default class UserController{
    constructor(){
        this.userRepository= new UserRepository();
    }

    async signUp(req,res,next){
        try{
            const result= await this.userRepository.addUser(req.body);
            if(result.success){
                res.status(201).json({success:true,res:result.res})
            }else{
                res.status(400).json({success:false,res:result.res})
            }

        }catch(err){
            next(err);
        }
    }

    async signIn(req,res,next){
        try{
            const result = await this.userRepository.login(req.body);
            if (result.success) {
                const token = jwt.sign(
                    { userId: result.res._id, user: result.res },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
               
                res.json({ success: true, msg: "user login successful", token });

            } else {
                res.status(400).json({success:false,res:result.res})
            }


        }catch(err){
            next(err);
        }
    }

    async downloadCSV(req,res,next){
        try{
            const result = await this.userRepository.createCSV();
            if(result.success){
                res.status(200).sendFile('data.csv', { root: '.' });
            }

            
        }catch(err){
            next(err);
        }
    }

    logout(req,res){
        req.session.destroy(err=>{
            if(err){
                console.log(err);
                res.status(500).json({ success: false, res: "An error occurred during logout" });
            }else{
                res.status(200).json({ success: true, res: "Logout successful" });
            }
        });
    }
}