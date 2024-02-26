const mongoose = require("mongoose");

const profanityFilterSchema = new mongoose.Schema({
  bannedWords: [String],
});

const Profanity = mongoose.model("Profanity", profanityFilterSchema);

module.exports = Profanity;
