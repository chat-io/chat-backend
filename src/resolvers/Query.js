const models = require("../../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require("sequelize");

Query = {
  async users(parent, args, ctx, info) {
    return await User.findAll();
  },
  async user(parent, args, ctx, info) {
    return await User.findOne({
      where: {
        id: args.userId,
      },
    });
  },
  async chats(prent, args, ctx, info) {
    console.log("chats query called");
    // console.log(args.userId);
    const user = await User.findOne({
      where: {
        id: args.userId,
      },
      include: [
        {
          model: Chat,
          include: [
            {
              model: User,
              where: {
                [Op.not]: {
                  id: args.userId,
                },
              },
            },
            {
              model: Message,
              limit: 20,
              order: [["id", "DESC"]],
            },
          ],
        },
      ],
    });

    return user.Chats;
  },
  async messages(parent, args, context, info) {
    const chatId = args.chatId;
    const page = args.page || 1;
    const limit = 10;

    const offset = page > 1 ? page * limit : 0;

    let messages = await Message.findAndCountAll({
      where: {
        chatId,
      },
      limit,
      offset,
    });

    const totalPages = Math.ceil(messages.count / limit);

    if (page > totalPages) {
      return {
        messages: [],
      };
    }

    messages = messages.rows.map((message) => message.dataValues);

    const result = {
      messages,
      page,
      totalPages,
    };

    return result;
  },
};

module.exports = Query;
