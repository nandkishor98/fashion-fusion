const JWT = require("jsonwebtoken");

const generateJWT = (payload) => {
  return JWT.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

const verifyJWT = () => {
  const d = JWT.verify(token, process.env.JWT_SECRET);
  return d;
};

module.exports = { generateJWT, verifyJWT };
