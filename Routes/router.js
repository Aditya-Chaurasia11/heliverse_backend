const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig");
const Team = require("../models/TeamSchema");
const User = require("../models/usersSchema");
const teamController = require("../Controllers/teamControllers");

// routes
router.post(
  "/user/register",
  upload.single("user_profile"),
  controllers.userpost
);
router.get("/user/details", controllers.userget);
router.get("/user/all", controllers.usergetAll);
router.get("/user/:id", controllers.singleuserget);
router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  controllers.useredit
);
router.delete("/user/delete/:id", controllers.userdelete);
router.put("/user/status/:id", controllers.userstatus);
router.get("/userexport", controllers.userExport);

//register a team
router.post("/team/register", teamController.teamPost);

//get all team
router.get("/teams/all", teamController.getAllTeam);

//get team by id
router.get("/teams/:id", teamController.getTeamById);

module.exports = router;
