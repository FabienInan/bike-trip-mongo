const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let articleSchema = new Schema({
  data: {
      fr: {
        title: {
            type: String
        },
        instagramId: {
            type: String
        },
        content: {
            type: Buffer
        },
      },
      en: {
        title: {
            type: String
        },
        content: {
            type: Buffer
        },
      }
  },
  date: {
    type: Date
  }
});

let userSchema = new Schema({
  data: {
      isAdmin: {
        type: Boolean
      },
      login: {
        type: String
      },
      pwd: {
        type: String
      },
  },
});

const article = mongoose.model("article", articleSchema);
const user = mongoose.model("user", userSchema);

module.exports = {
  article: article,
  user: user
}