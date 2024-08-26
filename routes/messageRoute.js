const express = require("express");
const { messageProfilesController, messagesFindControllers } = require("../controllers/message.controller");

const messageProgileRoute = express.Router();
const FingMessageRoute = express.Router();
messageProgileRoute.get("/api/message/profiles/:userId",messageProfilesController);
// messageProgileRoute.get("/api/message/profiles",messageProfilesController);
FingMessageRoute.get("/api/find/message/:user1/:user2",messagesFindControllers);
module.exports ={messageProgileRoute,FingMessageRoute}