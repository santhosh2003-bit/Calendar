const mongoose = require("mongoose");

const Event = mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
module.exports = mongoose.model("Event", Event);
