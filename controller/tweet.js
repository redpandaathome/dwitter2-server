import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req,res,next){
   const username = req.query.username;
   //✨ await (a?b:c)
   let data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
   res.status(200).json(data);
}