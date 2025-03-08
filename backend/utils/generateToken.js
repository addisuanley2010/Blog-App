import jwt from "jsonwebtoken"

export const generateToken = async (userId) => {
    const token = await jwt.sign({ userId }, "my_secret_key", {
        expiresIn: 360000,
      });

    return token;
}


