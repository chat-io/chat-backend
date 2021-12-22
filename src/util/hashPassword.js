const bcrypt = require("bcrypt");

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  return user;
};

module.exports = { hashPassword };
