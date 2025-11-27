const http = require('http');
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const {Server} = require('socket.io')

app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
       origin:"http://localhost:5173",
       methods:["POST","GET"],
   }
})

io.on("connection",(socket)=>{
     console.log("user connected:", socket.id);
     
     socket.on('disconnect',()=>{
         console.log("user disconnected:", socket.id);
     })
     
     socket.on("join_room",(roomId)=>{
         socket.join(roomId);
         console.log(`User ${socket.id} joined room ${roomId}`);
     })
     
     socket.on("send_mess",(data)=>{
        console.log("Message received:", data);
        // استفاده از io.to() به جای socket.to() برای ارسال به همه در اتاق
        io.to(data.room).emit("get_mess",data,socket.id);
     })
})

server.listen(3000, () => {
    console.log('Server running on port 3000');
});









