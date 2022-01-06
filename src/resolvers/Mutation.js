const models = require("../../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../util/token");
const { signupValidation, loginValidation } = require("../validators/auth");
const { sequelize } = require("../../models");

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
    const isDataValid = signupValidation(args.data);
    if (!isDataValid) {
      throw new Error("Invalid Data.");
    }

    args.data.avatar = `${process.env.FILE_SERVER_URL}/avatar/avatar.png`;

    let user = await User.create(args.data);
    user = user.toJSON();
    user.password = "";

    return {
      token: generateToken(user),
      user,
    };
  },
  async updateUser(parent, args, ctx, info) {
    await User.update(args.data, {
      where: { id: args.data.id },
    });

    let user = await User.findOne({
      where: {
        id: args.data.id,
      },
    });

    const userData = user.toJSON();
    userData.password = "";

    return {
      token: generateToken(userData),
      user: userData,
    };
  },
  async createChat(parent, args, ctx, info) {
    const userId = args.userId;
    const partnerId = args.partnerId;

    const t = await sequelize.transaction();

    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Chat,
            where: {
              type: "dual",
            },
            include: [
              {
                model: ChatUser,
                where: {
                  userId: partnerId,
                },
              },
            ],
          },
        ],
      });

      if (user && user.Chats.length > 0) {
        throw new Error("Chat with this user already exists!");
      }

      const chat = await Chat.create({ type: "dual" }, { transaction: t });

      await ChatUser.bulkCreate(
        [
          {
            chatId: chat.id,
            userId,
          },
          {
            chatId: chat.id,
            userId: partnerId,
          },
        ],
        { transaction: t }
      );

      await t.commit();

      const newChat = await Chat.findOne({
        where: {
          id: chat.id,
        },
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: userId,
              },
            },
          },
          {
            model: Message,
          },
        ],
      });

      return newChat;
    } catch (error) {
      await t.rollback();
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  async deleteChat(parent, args, ctx, info) {
    try {
      await Chat.destroy({
        where: {
          id: args.chatId,
        },
      });

      return `Chat deleted successfully!`;
    } catch (error) {
      throw new Error("Failed to delete the caht.");
    }
  },
};

module.exports = Mutation;
