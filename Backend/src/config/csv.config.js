
import StudentModel from '../features/student/student.schema.js';

export const fetchStudentSchemaData= async()=>{
    try{
        const data=await StudentModel.find().populate('interviews').lean();
        return data;

    }catch (error) {
    console.error('Error fetching data for the first schema:', error);
    return [];
  }
}



