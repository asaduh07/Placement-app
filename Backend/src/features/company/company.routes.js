import express from 'express';
import CompanyController from './company.controller.js';
const companyRouter= express.Router();
const companyController= new CompanyController();

companyRouter.route('/add').post((req,res,next)=>{
    companyController.createInterview(req,res,next)
});
companyRouter.route('/:id').post((req,res,next)=>{
    companyController.updateResult(req,res,next)
});
companyRouter.route('/all').get((req,res,next)=>{
    companyController.getAllInterview(req,res,next)
});

export default companyRouter;