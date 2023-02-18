const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  try {
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token" });
    }

    const token = tokenParts[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decodedData;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = verifyJWT;