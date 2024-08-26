const { MessageModel } = require("../models/message.model");
const { UserModel } = require("../models/user.model");

const messageProfilesController = async (req, res) => {
  const {userId} = req.params;

  try {
    const users = await MessageModel.distinct('receiver', { sender: userId });
    // You might want to include sender as well if you need both sides of the conversation

    // Assuming you have a User model to fetch user details
    const userList = await UserModel.find({ _id: { $in: users } });
    
    res.json(userList);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

const messagesFindControllers =async (req, res) => {
    const { user1, user2 } = req.params;;
    if (!user1 || !user2) {
      return res.status(400).json({ error: 'Both user1 and user2 are required' });
    }


    try {
        const messages = await MessageModel.find({
            $or :[
            { sender: user1, receiver: user2 },
            { sender: user2, receiver: user1 },
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
} 

module.exports ={messageProfilesController,messagesFindControllers}