const Team = require("../models/TeamSchema");
const express = require("express");
const router = express.Router();
const User = require("../models/usersSchema");
const users = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

// Create a team

// exports.teamPost = async (req, res) => {
//     const { teamName, selectedUsers } = req.body;
//     try {
//         // Check uniqueness of domains and availability
//     const domains = new Set();
//     const selectedUserDetails = await User.find({
//       _id: { $in: selectedUsers },
//     });

//     const filteredUsers = selectedUserDetails.filter((user) => {
//         if (domains.has(user.domain) || !user.active) {
//           return false;
//         }
//         domains.add(user.domain);
//         return true;
//       });

//       if (filteredUsers.length !== selectedUsers.length) {
//         return res
//           .status(400)
//           .json({ message: "Some users are invalid for team creation" });
//       }

//       // Create team and save it
//       const team = new Team({ name: teamName, users: selectedUsers });
//       const savedTeam = await team.save();

//       res.status(201).json(savedTeam);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.teamPost = async (req, res) => {
  const { teamName, selectedUsers } = req.body;

  try {
    const selectedUserDetails = await User.find({
      _id: { $in: selectedUsers },
    });

    // Check if all selected users are active and have unique domains
    const domains = new Set();
    const filteredUsers = selectedUserDetails.filter((user) => {
      if (!user.status === "Active" || domains.has(user.domain)) {
        return false;
      }
      domains.add(user.domain);
      return true;
    });

    if (filteredUsers.length !== selectedUsers.length) {
      return res
        .status(400)
        .json({ message: "Some users are invalid for team creation" });
    }

    // Create team and save it
    const team = new Team({ name: teamName, users: selectedUsers });
    const savedTeam = await team.save();

    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTeam = async (req, res) => {
  try {
    // Fetch all teams and populate the 'users' field to get user details
    const teams = await Team.find().populate("users");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeamById = async (req, res) => {
  const { id } = req.params; // Get the team ID from the URL parameter

  try {
    // Find the team by ID
    const team = await Team.findOne({ _id: id }).populate("users"); // Assuming you want to populate the 'users' field

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
