import express from "express";

const router = express.Router();

router.get("/", (req,res,next)=>{
   console.log("hi!");
})

export default router;