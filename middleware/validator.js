import { validationResult } from "express-validator";

export default function validate(req, res, next){
   const result = validationResult(req);
   const hasErrors = !result.isEmpty();
   if(hasErrors){
      console.log(result.errors[0].msg)
      return res.status(404).json({msg: result.errors[0].msg})
   }
   return next()
}
