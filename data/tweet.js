let tweets = [
  {
    id: "1", // 트윗 아이디
    text: "hey there", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "Bob", // 사용자 이름
    username: "bob", // 사용자 닉네임 (아이디)
    url: "https://picsum.photos/200/300", // (optional)사용자 프로파일 사진 URL
    createdAt: new Date().toString(), // 트윗 생성 날짜
    userId: "1",
  },
  {
    id: "2", // 트윗 아이디
    text: "what's up?", // 트윗 텍스트
    createdAt: Date.now().toString(), // 트윗 생성 날짜
    name: "wallE choi", // 사용자 이름
    username: "ellie", // 사용자 닉네임 (아이디)
    url: "", // 사용자 프로파일 사진 URL
    createdAt: new Date().toString(), // 트윗 생성 날짜
    userId: "2",
  },
];

export async function getAll() {
  console.log("getAll...");
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((x) => x.username === username);
}

export async function getById(id) {
  return tweets.find((x) => x.id == id);
}

export async function create(text, userId) {
  const id = parseInt(tweets.length).toString();
  const createdAt = new Date();
  const tweet = {
    id,
    text,
    createdAt,
    userId,
  }
  tweets = { tweet, ...tweet };
  return getById(tweet.id);
}

export async function update(id, text) {
  let tweet = await getById(id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((x) => x.id != id);
}
