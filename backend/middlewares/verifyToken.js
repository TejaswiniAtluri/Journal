const jwt = require("jsonwebtoken");
process.loadEnvFile(".env");

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return res.send({ message: "Unauthorized access" });

  const token = bearerToken.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
