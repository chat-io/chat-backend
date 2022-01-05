const models = require("../../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require("sequelize");

MessageResolver = {
  async chatId(parent, args, context, info) {
    const messageId = parent.id;

    let chatId = await Message.findOne({
      attributes: ["chatId"],
      where: {
        id: messageId,
      },
    });

    chatId = chatId.dataValues.chatId;

    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
    });

    return chat;
  },

  async fromUserId(parent, args, context, info) {
    const messageId = parent.id;

    let userId = await Message.findOne({
      attributes: ["fromUserId"],
      where: {
        id: messageId,
      },
    });

    userId = userId.dataValues.fromUserId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  },
};

module.exports = MessageResolver;
