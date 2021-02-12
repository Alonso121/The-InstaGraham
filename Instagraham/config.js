const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MongoUri: process.env.MONGOURI,
  JWTSecret: process.env.JWT_SECRET,
};
