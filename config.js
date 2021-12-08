import dotenv from 'dotenv'
dotenv.config()

function required(key, defaultValue = undefined){
   const value = process.env[key] || defaultValue;
   if (value == null){
      throw new Error(`Key ${key} is undefined!`);
   }
   return value;
}

export const config = {
   port: parseInt(required("PORT")),
   bcrypt: {
      saltRounds: parseInt(required("SALT_ROUNDS")),
   },
   jwt: {
      secret: required("SECRET"),
      jwtExpiresInDays: required("JWT_EXPIRES_IN_DAYS")
   },
}
