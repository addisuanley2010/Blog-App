import jwt from "jsonwebtoken"

export const generateToken = async (userId, role, username,isVerified,isBlocked) => {
  
    const token = await jwt.sign({ userId,role,username ,isVerified,isBlocked}, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });

    return token;
}


