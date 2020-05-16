const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  Team: String,
  Wins: String,
  Year: String,
  League: String,
  OBP: String,
  SLG: String,
  BattingAvg: String,
  RunsScored: String,
  RunsAllowed: String,
});

module.exports = mongoose.model("teams", DataSchema);