const jwt = require("jsonwebtoken");
const config = require("../../config/app");

const generateToken = (user) => {
  const token = jwt.sign(user, config.appKey);
  return token;
};

module.exports = { generateToken };
