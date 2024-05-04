import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(authHeader, "authHeader");
  // console.log(req.headers, "req.headers");

  // console.log(token, "token");

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Invalid token"));
    }
    req.user = user;
    next();
  });
};

export { authenticateToken };
