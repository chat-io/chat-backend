const validator = require("validator");

const signupValidation = (user) => {
  if (
    validator.isEmpty(user.firstName) ||
    validator.isEmpty(user.lastName) ||
    validator.isEmpty(user.email) ||
    validator.isEmpty(user.password)
  ) {
    return false;
  }

  if (!validator.isEmail(user.email)) {
    return false;
  }

  if (!isByteLength(user.password, { min: 5 })) {
    return false;
  }

  return true;
};

module.exports = { signupValidation };
