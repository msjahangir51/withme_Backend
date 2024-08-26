const { default: mongoose } = require("mongoose")

const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:false
    },
    setupProfile:{
        type:Boolean,
        default: false
    }
})


const UserModel = mongoose.model("users",userSchema)

module.exports = { UserModel }