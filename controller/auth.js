import * as userRepository from "../data/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export async function signup(req, res, next) {
 console.log("SIGNUP...");
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    // 409...
    return res
      .sendStatus(409)
      .json({ message: `username ${username} already exiests!` });
  }

  let hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  console.log(`hashed`, await hashed);
  let user = {
    username,
    // ✨
    password: hashed,
    name,
    email,
    url,
  };

  let userId = await userRepository.createUser(user);

  //create jwt - ✨ userId???
  const token = await createJwtToken(userId);

  // ✨ what next at the frontend with these?
  return res.status(200).json({ token, username });
}

export async function login(req, res, next) {
   console.log("login...")
   const { username, password } = req.body
   const user = await userRepository.findByUsername(username);
   if(!user){
      return res.status(404).json({message:"Invalid user or password"});
   }

   // verify username and password?
   const isValidPassword = await bcrypt.compare(password, user.password);
   if(!isValidPassword) {
      return res.status(404).json({message:"Invalid user or password"});
   }

   // create jwt
   const token = await createJwtToken(user.id);
   return res.status(200).json({ token, username});
}

async function createJwtToken(userId){
   return jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.jwtExpiresInDays,
    });
}

export async function me(req, res, next) {
   console.log('me...');
   const user = await userRepository.findById(req.userId);
   if(!user){
      return res.status(404).json({message: 'User not found'})
   }
   
   return res.status(200).json({token: req.token, username: user.username});
}