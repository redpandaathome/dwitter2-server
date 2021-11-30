import express from "express";

const router = express.Router();

let tweets = [
  {
    id: "1", // 트윗 아이디
    text: "hey there", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "Bob", // 사용자 이름
    username: "bob", // 사용자 닉네임 (아이디)
    url: "https://picsum.photos/200/300", // (optional)사용자 프로파일 사진 URL
  },
  {
    id: "2", // 트윗 아이디
    text: "what's up?", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "wallE choi", // 사용자 이름
    username: "ellie", // 사용자 닉네임 (아이디)
    url: "", // 사용자 프로파일 사진 URL
  },
];

router.get("/", (req, res, next) => {
   const username = req.query.username;
   const data = username? tweets.filter(x=>x.username===username) : tweets;
   // ✨
   res.status(200).json(data);
});

router.get("/:id", (req, res, next) => {
   const id = req.params.id;
   //✨ find, filter...
   const tweet = tweets.find(x=>x.id == id);
   if(tweet){
      res.status(200).json()
   }
   res.status(404).json({message:`Tweet id ${id} not found`})
})

router.post("/", (req, res, next) => {
   let {text, name, username} = req.body;
   const id = (parseInt(tweets.length)).toString();
   const createdAt = new Date();
   const tweet = {
      id,
      text,
      createdAt,
      name,
      username
   }
   //✨
   tweets = [tweet,...tweets];
   res.status(201).json(tweet);
})

router.put("/:id", (req, res, next) => {
   const id = req.params.id;
   const text = req.body.text;
   let tweet = tweets.find(x=>x.id == id);
   if(!tweet){
      res.status(404).json({message:`Tweet id ${id} not found`})
   }
   tweet.text = text;
   res.status(200).json(tweet);
})

router.delete("/:id", (req, res, next) => {
   const id = req.params.id;
   tweets = tweets.filter(x=>x.id != id)
   //✨
   res.sendStatus(204);
})

export default router;
