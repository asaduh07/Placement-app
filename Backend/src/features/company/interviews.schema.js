import mongoose from 'mongoose';

const InterviewSchema=new mongoose.Schema({
    student:{type:mongoose.Schema.Types.ObjectId,
    ref:"Student"},
    company: { type:String,required:true },
    date: { type: Date },
    result: { type: String, enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt']}
    
});

const InterviewModel= mongoose.model('Interview',InterviewSchema);
export default InterviewModel;