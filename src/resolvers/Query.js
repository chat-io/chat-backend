const User = require("../../models").User;

Query = {
  async users(parent, args, ctx, info) {
    return await User.findAll();
  },
};

module.exports = Query;
