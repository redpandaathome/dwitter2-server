export let users = [
   {
     id: "1", // 사용자의 고유한 아이디
     username: "ellie", // 사용자 닉네임 (아이디)
     password: "$2b$10$6NXw4nJpt0q7kfkZS00/YeEBjb1S9WUNL5RwY5ugW0of3yX4XaGcO", // 사용자 비밀번호
     name: "Ellie", // 사용자 이름
     email: "ellie@gmail.com", // 사용자 이메일
     url: "", //(optional) // 사용자 프로파일 사진 URL
   },
 ];

export async function getByUsername(username){
   return users.find((x)=>x.username === username);
}

export async function createUser(user){
   const created = {...user, id:((parseInt(users.length) + 1)).toString()}
   users.push(created)
   return created.id
}

export async function getById(userId){
   return users.find((x)=>x.id === userId);
}