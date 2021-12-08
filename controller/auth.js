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

async function createJwtToken(userId){
   return jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.jwtExpiresInDays,
    });
}