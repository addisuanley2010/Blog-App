import jwt from "jsonwebtoken";
export const authentication = async (req, res, next) => {

  console.log(req.headers)


  let token;
  if (
    req.headers.authorization 
  ) {
    try {

      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      req.user.isBlocked? res.status(401).json({ message: "you are blocked! contact the admin. okay", error,success:false }):next();

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
