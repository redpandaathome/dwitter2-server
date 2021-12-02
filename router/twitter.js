import express from "express";
import { body } from "express-validator";
import validate from "../middleware/validator.js";
import * as tweetController from "../controller/tweet.js";
const router = express.Router();


//💜
router.get("/", tweetController.getTweets);

router.get("/:id", tweetController.getById);

router.post(
  "/",
  [
    body("text")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Text can not be shorter than 3 characters"),
      validate
  ],
  tweetController.createTweet
);

router.put("/:id", tweetController.updateTweet);

router.delete("/:id", tweetController.deleteTweet);

export default router;
