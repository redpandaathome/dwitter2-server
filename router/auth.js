import express from "express";
import { body, validationResult } from "express-validator";
import * as authController from "../controller/auth.js";
import { validate } from '../middleware/validator.js';
const router = express.Router();

const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("username should be at least 3 characters"),
  validate,
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters"),
  validate,
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("wrong email form"),
  validate,
  body("url")
    .trim()
    .isURL()
    .withMessage("invalid url form")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

const validateLogin = [
   body("username")
     .trim()
     .isLength({ min: 3 })
     .withMessage("username should be at least 3 characters"),
   validate,
   body("password")
     .trim()
     .isLength({ min: 6 })
     .withMessage("password should be at least 6 characters"),
   validate,
 ];

router.post("/signup", validateSignup, authController.signup);
//post!?
router.post("/login", authController.login);
export default router;
