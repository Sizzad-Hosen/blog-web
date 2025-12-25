import jwt, { JwtPayload } from "jsonwebtoken";


const generateToken = async (payload: { userId: number }, secret: string) => {
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;

}

export const getUserInfoFromToken  = (authHeader?: string): JwtPayload | null => {
  if (!authHeader) return null;

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) return null;

  console.log("Token:", token)

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    console.log("User Info:", userInfo); // decoded payload

    return userInfo

  } catch (err) {
    return null;
  }
};


export const jwtHelper = {
    generateToken,
    getUserInfoFromToken
}