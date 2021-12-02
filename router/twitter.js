import express from "express";
import { body, query } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as tweetController from "../controller/tweet.js";
const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Text can not be shorter than 3 characters"),
  validate,
];

//💜
router.get(
  "/",
  [
    query("username")
      .trim()
      .isLength({ min: 2 })
      .withMessage("username must be more than 2 letters")
      .optional({ nullable: true, checkFalsy: true }),
      validate,
  ],
  tweetController.getTweets
);

router.get("/:id", tweetController.getById);

router.post("/", validateTweet, tweetController.createTweet);

router.put("/:id", validateTweet, tweetController.updateTweet);

router.delete("/:id", tweetController.deleteTweet);

export default router;
