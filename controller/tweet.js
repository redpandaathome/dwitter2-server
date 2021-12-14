import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res, next) {
  const username = req.query.username;
  //✨ await (a?b:c)
  let data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getById(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  }
  // else needed due to this problem - "Cannot set headers after they are sent to the client"
  else {
    res.status(404).json({ message: `Tweet id ${id} not found` });
  }
}

export async function createTweet(req, res, next) {
  let { text } = req.body;
  let userId = req.userId;

  let newTweet = await tweetRepository.create(text, userId);
  res.status(201).json(newTweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;

  let tweet = await tweetRepository.getById(id);
  if ( !tweet ) {
    res.status(404).json({ message: `Tweet id ${id} not found` });
  }
  // ✨✨✨✨✨
  if ( tweet.userId !== req.userId ) {
    res.sendStatus(403);
  }

  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;

  let tweet = await tweetRepository.getById(id);
  if ( !tweet ) {
    res.status(404).json({ message: `Tweet id ${id} not found` });
  }
  if ( tweet.userId !== req.userId ) {
    res.sendStatus(403);
  }

  await tweetRepository.remove(id);
  res.sendStatus(204);
}
