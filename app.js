const express = require("express");
const app = express()
const cors = require("cors");
const { registerRouter, LoginRouter, UserRouter, SearchUserRouter, ProfilePictureUpdataRoute } = require("./routes/User.Route");
const passport = require("passport");
const { messageProgileRoute, FingMessageRoute } = require("./routes/messageRoute");
app.use(cors({
    origin:"*",
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
require("./config/passport")

app.use(express.static("uploads"))
app.get("/",(req, res) => {
  res.send("api is running")
})
app.use(registerRouter)
app.use(LoginRouter)
app.use(UserRouter)
app.use(SearchUserRouter)
app.use(messageProgileRoute)
app.use(FingMessageRoute)
app.use(ProfilePictureUpdataRoute)




app.use((req, res,next) => {
    res.status(404).send({
        status:404,
        message:"Route not found"
    })
    next()
})


app.use((err,req, res,next) => {
    res.status(500).send({
        status:500,
        message: err.message
    })  

})
module.exports = {app}