const User = require("../../models").User;
const bcrypt = require("bcrypt");
const { generateToken } = require("../util/token");

Mutation = {
  async login(parent, args, ctx, info) {
    const { email, password } = args.data;

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
    user = user.toJSON();
    //user.get({raw: true}) is also fine
    user.password = "";
    return {
      token: generateToken(user),
      user,
    };
  },

  async signup(parent, args, ctx, info) {
    let user = await User.create(args.data);
    user = user.toJSON();
    user.password = "";

    return {
      token: generateToken(user),
      user,
    };
  },
};

module.exports = Mutation;
