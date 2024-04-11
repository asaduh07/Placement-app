import StudentModel from './student.schema.js'
import { ApplicationError } from '../../Error-handler/applicationerror.js';
import {ObjectId} from 'mongodb';
export default class StudentRepository{
    async addStudent(studentData){
        try{
            const newStudent= new StudentModel(studentData);
            const savedStudent= await newStudent.save();
            return{success:true,res:savedStudent};

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);

        }
    }
    async getStudentById(studentId){
        try{
            const student= await StudentModel.findById(studentId);
            if(student){
                return{success:true,res:student};
            }else{
                return{success:false,res:"Student doesn't exist"}
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);

        }
    }

    async getAll(){
        try{
            const students= await StudentModel.find();
            if(students.length>0){
                return{success:true,res:students};
            }else{
                return{success:false,res:"No Student found"}
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);

        }

    }

    
}