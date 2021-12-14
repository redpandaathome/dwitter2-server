import * as userRepository from '../data/auth.js';

let tweets = [
  {
    id: "1", // 트윗 아이디
    text: "hey there", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    userId: "1",
  },
  {
    id: "2", // 트윗 아이디
    text: "what's up?", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    userId: "1",
  },
];

//console.log(`new Date().toString():`, new Date().toString()); //Tue Dec 14 2021 09:38:03 GMT+0900 (Korean Standard Time)
//console.log(`Date.now().toString():`, Date.now().toString()); //1639442283209


// now bring { username, name, url } from userRepository... and mapping!
export async function getAll() {
  return Promise.all(
    tweets.map( async (tweet) => {
      console.log(`tweet.userId`, tweet.userId);
      const { username, name, url } = await userRepository.getById(tweet.userId);
      return { ...tweet, username, name, url }
    })
  )
}

// ✨ (()=>{return }), (()=>)
export async function getAllByUsername(username) {
  return getAll().then((tweets)=>
    tweets.filter((tweet) => tweet.username === username )
  );
}

export async function getById(id) {
  const found = tweets.find((t) => t.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.getById(found.userId);
  return {...found, username, name, url};
}

export async function create(text, userId) {
  const id = (parseInt(tweets.length)+1).toString();
  const createdAt = Date.now().toString();
  const tweet = {
    id,
    text,
    createdAt,
    userId,
  }
  // ✨ not {} but [] !
  tweets = [ tweet, ...tweets ];

  return getById(tweet.id);
}

export async function update(id, text) {
  let tweet = await getById(id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((x) => x.id != id);
}
