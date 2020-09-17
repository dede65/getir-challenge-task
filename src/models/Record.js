const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  minCount: {
    type: Number,
  },
  maxCount: {
    type: Number,
  },
});

module.exports =  mongoose.model("record", recordSchema);

