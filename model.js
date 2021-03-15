const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let article = new Schema({
  data: {
      fr: {
        title: {
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

module.exports = mongoose.model("Article", article);