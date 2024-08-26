const express = require("express");
const { registerControllers, LoginControllers, UserControllers, SearchUserControllers, ProfilePictureUpdataControllers } = require("../controllers/users.controller");
const { Auth } = require("../config/auth");
const { upload } = require("../config/multer");

const registerRouter = express.Router();
const LoginRouter = express.Router();
const UserRouter = express.Router();
const SearchUserRouter = express.Router();
const ProfilePictureUpdataRoute = express.Router();

registerRouter.post("/api/register",registerControllers)
LoginRouter.post("/api/login",LoginControllers)
UserRouter.get("/api/profile",Auth,UserControllers)
SearchUserRouter.get("/api/search",Auth,SearchUserControllers)
ProfilePictureUpdataRoute.put("/profile/picture/update",upload.single("image"), ProfilePictureUpdataControllers)

module.exports ={registerRouter,LoginRouter,UserRouter,SearchUserRouter,ProfilePictureUpdataRoute}