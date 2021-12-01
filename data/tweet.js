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

export async function getAll(){
  console.log('getAll...');
   return tweets;
 }

export async function getAllByUsername(username){
   return tweets.filter(x=>x.username===username)
}

export function getById(id){
  return tweets.find(x=>x.id == id);
}

export function create(tweet){
  const id = (parseInt(tweets.length)).toString();
  const createdAt = new Date();
  
  let newTweet = {id,createdAt,...tweet};
  tweets = [newTweet,...tweets];
  return newTweet;
}

export function update(id, text){
  let tweet = getById(id);
   if(tweet){
     tweet.text = text;
   }
  return tweet;
}

export function remove(id){
  tweets = tweets.filter(x=>x.id != id)
}