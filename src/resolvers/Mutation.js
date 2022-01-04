const User = require("../../models").User;
const bcrypt = require("bcrypt");
const { generateToken } = require("../util/token");
const { signupValidation, loginValidation } = require("../validators/auth");

Mutation = {
  async login(parent, args, ctx, info) {
    const { email, password } = args.data;
    const isDataValid = loginValidation(email, password);

    if (!isDataValid) {
      throw new Error("Unable to login");
    }
    //find user
    let user = await User.findOne({
      where: {
        email,
      },
    });

    //check if user exists
    if (!user) {
      throw new Error("Unable to login");
    }

    //check if password is valid
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Unable to login!");
    }

    //generate auth token
    const userData = user.toJSON();
    //user.get({raw: true}) is also fine

    userData.password = "";
    return {
      token: generateToken(userData),
      user: userData,
    };
  },

  async signup(parent, args, ctx, info) {
    console.log(args.data);
    const isDataValid = signupValidation(args.data);
    if (!isDataValid) {
      throw new Error("Invalid Data.");
    }

    let user = await User.create(args.data);
    user = user.toJSON();
    user.password = "";

    return {
      token: generateToken(user),
      user,
    };
  },
  async updateUser(parent, args, ctx, info) {
    console.log("updateUser called");
    console.log(args.data);

    await User.update(args.data, {
      where: { id: args.data.id },
    });

    console.log("updated");

    let user = await User.findOne({
      where: {
        id: args.data.id,
      },
    });

    const userData = user.toJSON();
    userData.password = "";

    userData.password = "";
    return {
      token: generateToken(userData),
      user: userData,
    };
  },
};

module.exports = Mutation;
