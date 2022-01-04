const jwt = require("jsonwebtoken");
const config = require("../../config/app");

const generateToken = (user) => {
  const expiresIn = 3600; //sec
  const token = jwt.sign(user, config.appKey, { expiresIn });
  return token;
};

module.exports = { generateToken };
