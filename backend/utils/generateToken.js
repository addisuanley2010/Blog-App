import jwt from "jsonwebtoken"

export const generateToken = async (userId, role, username) => {
  
    const token = await jwt.sign({ userId,role,username }, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });

    return token;
}


