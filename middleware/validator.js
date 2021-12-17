import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`errors`, errors);
    return res.status(400).json({ message: errors.errors[0].msg });
  }
  return next();
};
