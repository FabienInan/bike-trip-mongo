const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let article = new Schema({
  data: {
    type: Buffer
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model("Article", article);