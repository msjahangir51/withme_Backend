const { app } = require("../app");
const { MessageModel } = require("../models/message.model");
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
    }
});



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ sender, receiver }) => {
        const room = [sender, receiver].sort().join('-');
        socket.join(room);  // Correctly joining the room
        console.log(`${sender} joined room: ${room}`);
    });

    socket.on('sendMessage', async ({ sender, receiver, message }) => {
        const room = [sender, receiver].sort().join('-');
        const newMessage = new MessageModel({ sender, receiver, message });
        await newMessage.save();
        io.to(room).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


module.exports ={server}