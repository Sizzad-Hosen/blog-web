import  Jwt  from "jsonwebtoken";



import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = async(payload:{userId:string },secret:string)=>{

  const token =   await Jwt.sign(payload,secret,{expiresIn:process.env.JWT_EXPIRES_IN || '7d'});

return token;

}

export const verifyToken = (authHeader?: string): JwtPayload => {
  if (!authHeader) {
    throw new Error("Authorization header missing");
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    throw new Error("Token missing");
  }
console.log(token)
  try {
    return jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
