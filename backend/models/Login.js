const mongoose = require("mongoose");

const loginSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
},
  profileImage: {
    type: String,
    default: ""
  },
  
notifications: {
  type: Boolean,
  default: true
},
darkMode: {
  type: Boolean,
  default: false
},
  phone: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  }
, role: {

    type: String,

    enum: ["user", "admin"],

    default: "user"

  }
});

module.exports = mongoose.model("User", loginSignupSchema);