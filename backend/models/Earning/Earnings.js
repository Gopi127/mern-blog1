const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    amount: {
      type: Number,
      required: true,
    },
    calculationOn: {
      type: Date, // the date on which this earnings were calculated for
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Earnings = mongoose.model("Earninga", earningSchema);

module.exports = Earnings;
