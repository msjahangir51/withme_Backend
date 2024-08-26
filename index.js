const { DB_CONNECTION } = require("./config/db.js")
const {PORT} = require("./config/secret.js")
const { server } = require("./config/socket.js")


server.listen(PORT,()=>{
    console.log("server is running at http://localhost:"+PORT)
    DB_CONNECTION()
})