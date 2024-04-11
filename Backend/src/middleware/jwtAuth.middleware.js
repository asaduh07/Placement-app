import jwt from 'jsonwebtoken';


const jwtAuth=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader && authHeader.split(' ')[1];
    if(!jwtToken){
        return res.status(401).send("Unauthorised, login again");
    }
    try{
        const payload=jwt.verify(jwtToken, process.env.JWT_SECRET)
        req.userId=payload.userId;
        req.user=payload.user;
        

    }catch(err){
        return res.status(401).send("Unauthorised, login again");
    }
    next();
}

export default jwtAuth;