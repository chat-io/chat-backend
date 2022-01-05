const models = require("../../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require("sequelize");

ChatResolver = {
  async users(parent, args, context, info) {
    const chatId = parent.id;

    let usersId = await ChatUser.findAll({
      where: {
        chatId,
      },
    });

    usersId = usersId.map((userId) => userId.dataValues.userId);

    const users = await User.findAll({
      where: {
        id: {
          [Op.or]: usersId,
        },
      },
    });

    return users;
  },
  async messages(parent, args, context, info) {
    const chatId = parent.id;

    const messages = await Message.findAll({
      where: {
        chatId,
      },
      limit: 20,
      order: [["id", "DESC"]],
    });
    return messages;
  },
};

module.exports = ChatResolver;
