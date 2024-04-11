import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, reequired:true},
    password:{type:String,required:true}
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const hashedPassword= await bcrypt.hash(this.password,12);
    this.password=hashedPassword;
    next();


})

const UserModel=mongoose.model('User',UserSchema);
export default UserModel;