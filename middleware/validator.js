import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = {
  message: 'Authentication Error'
}


export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  return next();
};

export const isAuth = (req, res, next) => {
  console.log("ISAUTH...");
  const authHeader = req.get('Authorization');
  // 💜
  if(!(authHeader && authHeader.startsWith('Bearer '))){
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(' ')[1]

  // ✨ why async(err, decoded)? we are gonna use async function usesrRopository - findById...
  jwt.verify(token, config.jwt.secret, async(err, decoded)=>{
    if(err){
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.userId);

    if(!user){
      return res.status(404).json(AUTH_ERROR);
    }

    req.userId = user.id;
    req.token = token;
    return next();
  });
}