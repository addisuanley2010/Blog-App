import jwt from "jsonwebtoken";
export const authentication = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization 
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized", error });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const authorization = (roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Not authorized - insufficient permissions" });
  }
};
