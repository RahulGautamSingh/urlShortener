const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
  },
});

const UrlModel = mongoose.model("Url", UrlSchema);

module.exports = UrlModel;
