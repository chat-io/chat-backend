const User = require("../../models").User;

Query = {
  me(parent, args, ctx, info) {
    return {
      id: "test123",
      email: "ryan@example.com",
      name: "Ryan SJ Kim",
    };
  },
  async users(parent, args, ctx, info) {
    return await User.findAll();
  },
};

module.exports = Query;
