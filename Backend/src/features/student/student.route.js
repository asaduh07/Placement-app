import express from 'express';
import StudentController from './student.controller.js';
const studentRouter= express.Router();
const studentController= new StudentController();

studentRouter.route('/add').post((req,res,next)=>{
    studentController.addStudent(req,res,next)
});
studentRouter.route('/all').get((req,res,next)=>{
    studentController.getAllStudents(req,res,next)
});

studentRouter.route('/:id').get((req,res,next)=>{
    studentController.getStudentById(req,res,next)
});


export default studentRouter;