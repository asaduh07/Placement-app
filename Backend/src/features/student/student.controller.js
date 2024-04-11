
import StudentRepository from "./student.repository.js"
export default class StudentController{
    constructor(){
        this.studentRepository=new StudentRepository();
    }

    async addStudent(req,res,next){
        try{
            const result=await this.studentRepository.addStudent(req.body);
            if(result.success){
                res.status(201).json({success:true,res:result.res})
            }else{
                res.status(400).json({success:false,res:result.res})
            }

        }catch(err){
            next(err)
        }
    }

    async getStudentById(req,res,next){
        try{
            const id=req.params.id;
            const result=await this.studentRepository.getStudentById(id);
            if(result.success){
                res.status(201).json({success:true,res:result.res})
            }else{
                res.status(400).json({success:false,res:result.res})
            }
            

        }catch(err){
            next(err);
        }
    }
    async getAllStudents(req,res,next){
        try{
            const result=await this.studentRepository.getAll();
            if(result.success){
                res.status(200).json({success:true,res:result.res})
            }else{
                res.status(404).json({success:false,res:result.res})
            }

        }catch(err){
            next(err);
        }
    }
    
}