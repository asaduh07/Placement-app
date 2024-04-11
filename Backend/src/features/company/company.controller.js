import CompanyRepository from "./company.repository.js"

export default class CompanyController{
    constructor(){
        this.companyRepository= new CompanyRepository();
    }

    async createInterview(req,res,next){
        try{
            const result=await this.companyRepository.addInterview(req.body);
            if(result.success){
                res.status(201).json({success:true,res:result.res})
            }else{
                res.status(400).json({success:false,res:result.res})
            }

        }catch(err){
            next(err)
        }
    }

    async updateResult(req,res,next){
        try{
            const id=req.params.id;
            const result= await this.companyRepository.updateResult(req.body,id);
            if(result.success){
                res.status(201).json({success:true,res:result.res})
            }else{
                res.status(400).json({success:false,res:result.res})
            }

        }catch(err){
            next(err)
        }
    }

    async getAllInterview(req,res,next){
        try{
            const result=await this.companyRepository.getAllInterview();
            if(result.success){
                res.status(201).json({success:true,res:result.res})
            }else{
                res.status(400).json({success:false,res:result.res})
            }

        }catch(err){
            next(err);
        }
    }
}