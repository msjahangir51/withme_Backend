const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/secret");

const multer = require("multer");
const registerControllers = async(req, res) => {

try {
  const {fullname, username,password,gender} = req.body;
  const user =await UserModel.findOne({username});
  if(user) return res.status(409).send({
      status:409,
    message:"user already exists.."
  })

  bcrypt.hash(password,10, async (err,hash)=>{
    const newUser = new UserModel({
      fullName: fullname,
      username: username,
      password: hash,
      gender: gender
    });

    await newUser.save().then(user =>{
      res.status(201).send({
        success:true,
        status:201,
        message:{
          message:"user create successfull",
          username:user.username,
          fullname:user.fullName,
          gender:user.gender,
          password:user.password
        }
      })
    })
  })
  
} catch (error) {
  res.status(500).send({
    message:error.message,
    success:false
  })
}
}


const LoginControllers = async (req, res) => {
  try {
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});
  
    if(!user) return res.status(404).send({
      status:404,
      success:false,
      message: "username not found",
    })

    if(!bcrypt.compareSync(password,user.password)) return res.status(401).send({
      status:401,
      success:false,
      message: "password not matched?"
    })

    const payload = {
      id:user._id,
      fullname: user.fullName,
      username:user.username,
      gender:user.gender,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"30d"})
    res.status(200).send({
      status:200,
      success:false,
      message: "user is logged",
      token:"Bearer "+token
    })
  } catch (error) {
   res.status(500).send({
    status:500,
    message:error.message
   }) 
  }
}

 
const UserControllers = (req, res) => {
  const user = req.user;
  res.status(200).send(user)
}


const SearchUserControllers = async (req, res) => {
  const searchKeyword = req.query.search
    ? {
      $or:[
        {fullName:{$regex: req.query.search, $options:"i"}},
        {username:{$regex: req.query.search, $options:"i"}}
      ]
    } : {}; 

    const users =await UserModel.find(searchKeyword).find({_id: {$ne: req.user._id}});
    res.status(200).send(users)
    console.log(req.user)
}



const ProfilePictureUpdataControllers = async (req,res)=>{
  try {
      // Find the user by ID and update the profileImage field
      const user = await UserModel.findByIdAndUpdate(req.body.userId,{
        profileImage:req.file.filename
      });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        message: 'Profile image uploaded successfully',
        user
      });


  } catch (error) {
    res.status(500).json({ message: 'An error occurred',  error:error.message });
  }
    
}
module.exports ={registerControllers,LoginControllers,UserControllers,SearchUserControllers,ProfilePictureUpdataControllers}