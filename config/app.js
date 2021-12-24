require("dotenv").config();

module.exports = {
  appKey: process.env.APP_KEY,
  appUrl: process.env.APP_URL,
  appPort: process.env.APP_PORT,
  fileServerUrl: process.env.FILE_SERVER_URL,
  fileServerPort: process.env.FILE_SERVER_PORT,
};
