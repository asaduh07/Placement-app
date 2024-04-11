import InterviewModel from "./interviews.schema.js";
import StudentModel from "../student/student.schema.js";
import mongoose from 'mongoose';
import { ApplicationError } from "../../Error-handler/applicationerror.js";
export default class CompanyRepository {

    async addInterview(data) {
        try {
            const { studentId, company,date } = data;
            const student = await StudentModel.findById(studentId);
            if (!student) {
                return { success: false, res: "student not found" };
            } else {
                const newInterview = new InterviewModel({
                    student: new mongoose.Types.ObjectId(studentId),
                    company: company,
                    date: new Date(date).toISOString(),
                })

                const savedInterview = await newInterview.save();
                student.interviews.push(savedInterview._id);
                await student.save();
                return { success: true, res: savedInterview }

            }


        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);

        }

    }

    async updateResult(data,id) {
        try {
            const{result}=data;
            const interview=await InterviewModel.findById(id);
            if(interview){
                interview.result=result;
                const savedInterview=await interview.save();
                return{success:true,res:savedInterview}
            }else{
                return{success:false,res:"Interview not found"}
            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);

        }
    }
    async getAllInterview(){
        try{
            const interviews= await InterviewModel.find().populate('student');
            if(interviews.length>0){
                return{success:true,res:interviews};
            }else{
                return{success:false,res:"No interview found"}
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);

        }

    }

}