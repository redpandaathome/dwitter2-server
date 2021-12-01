import express from "express";
import * as tweetController from '../controller/tweet.js';
const router = express.Router();

//💜
router.get("/", tweetController.getTweets);

router.get("/:id", (req, res, next) => {
   const id = req.params.id;
   //✨ find, filter...
   const tweet = tweetRepository.getById(id)
   if(tweet){
      res.status(200).json()
   }
   res.status(404).json({message:`Tweet id ${id} not found`})
})

router.post("/", (req, res, next) => {
   let {text, name, username} = req.body;
   const tweet = {
      text,
      name,
      username
   }
   let newTweet = tweetRepository.create(tweet);
   res.status(201).json(newTweet);
})

router.put("/:id", (req, res, next) => {
   const id = req.params.id;
   const text = req.body.text;
   
   tweet = tweetRepository.update(id, text);
   if(tweet){
      res.status(200).json(tweet);
   } else {
      res.status(404).json({message: `Tweet id ${id} not found`})
   }
})

router.delete("/:id", (req, res, next) => {
   const id = req.params.id;
   tweetRepository.remove(id);
   res.sendStatus(204);
})

export default router;
