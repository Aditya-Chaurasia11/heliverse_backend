// models/Team.js

const mongoose = require("mongoose");
const Users = require("./usersSchema");

const teamSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
