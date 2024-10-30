const jwt = require("jsonwebtoken");
const User = require("../users/user.model");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Split to get the token only

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId); // Validate the user exists

    if (!user) {
      return res.status(401).send({ message: "Invalid token." });
    }

    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
