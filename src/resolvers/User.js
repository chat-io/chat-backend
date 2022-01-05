const models = require("../../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require("sequelize");

UserResolver = {
  async chats(parent, args, context, info) {
    const userId = parent.id;

    let chatsId = await ChatUser.findAll({
      where: {
        userId,
      },
    });

    chatsId = chatsId.map((chatId) => chatId.dataValues.chatId);

    const chats = await Chat.findAll({
      where: {
        id: {
          [Op.or]: chatsId,
        },
      },
    });

    return chats;
  },
  async messages(parent, args, context, info) {
    const userId = parent.id;
    const messages = await Message.findAll({
      where: {
        fromUserId: userId,
      },
      limit: 20,
      order: [["id", "DESC"]],
    });

    return messages;
  },
};

module.exports = UserResolver;
