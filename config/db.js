const mongoose = require("mongoose");
const { DB_URL } = require("./secret");
const DB_CONNECTION = async()=>{
    await mongoose.connect(DB_URL).then(()=>{
        console.log("db is connected")
    }).catch((err)=>{
        console.error({err})
    })
}

module.exports = {DB_CONNECTION}