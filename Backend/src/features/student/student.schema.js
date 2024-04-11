import mongoose from 'mongoose';

const StudentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    batch:{type:String,required:true},
    college: { type: String, required: true },
    status: { type: String, enum: ['Placed', 'Not placed'], default:"Not placed" , required:true},
    courseScores: [
        {
            subject: { type: String, enum: ['DSA', 'WebD', 'React'], required: true },
            score: { type: Number }
        }
    ],
    interviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Interview"
        }
    ]
});

const StudentModel=mongoose.model('Student',StudentSchema);
export default StudentModel;