const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  setting: {
    type: String,
    required: true,
  },

  currency: {
    type: String,
    enum: ["EGP", "USD"],
    default: "EGP",
  },
});

module.exports =
  mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);