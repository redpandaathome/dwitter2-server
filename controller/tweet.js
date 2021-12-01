import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req,res,next){
   const username = req.query.username;
   //✨ await (a?b:c)
   let data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
   res.status(200).json(data);
}

export function getById(req,res,next){
   const id = req.params.id;
   const tweet = tweetRepository.getById(id)
   if(tweet){
      res.status(200).json(tweet);
   } 
   // else needed due to this problem - "Cannot set headers after they are sent to the client"
   else {
      res.status(404).json({message:`Tweet id ${id} not found`})
   }
}

export function createTweet(req,res,next){
   let {text, name, username} = req.body;
   const tweet = {
      text,
      name,
      username
   }
   let newTweet = tweetRepository.create(tweet);
   res.status(201).json(newTweet);
}

export function updateTweet(req, res, next){
   const id = req.params.id;
   const text = req.body.text;
   
   let tweet = tweetRepository.update(id, text);
   if(tweet){
      res.status(200).json(tweet);
   } else {
      res.status(404).json({message: `Tweet id ${id} not found`})
   }
}

export function deleteTweet(req, res, next){
   const id = req.params.id;
   tweetRepository.remove(id);
   res.sendStatus(204);
}