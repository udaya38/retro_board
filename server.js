const express = require('express');
const app = express()
const http = require('http');
const socketio = require('socket.io');
const server=http.createServer(app);
const io=socketio(server,{cors:{
    origin: '*'
}});

app.get('/',(req,res)=>{
    res.send('Server is up and running')
})
server.listen(process.env.PORT || 3000);
io.on('connection', socket => {
    socket.on('join-room',room =>{
        socket.join(room);
    });
    socket.on('make-button-enabled',(value,room)=>{
        io.to(room).emit('receive-make-button-enabled',value);
    });
    socket.on('make-blur',(value,room)=>{
        io.to(room).emit('receive-make-blur',value);
    });
    socket.on('went-well',(value,room)=>{
        io.to(room).emit('receive-went-well',value);
    });
    socket.on('to-improve',(value,room)=>{
        io.to(room).emit('receive-to-improve',value);
        //socket.broadcast.emit('receive-to-improve',value)
    });
    socket.on('action-items',(value,room)=>{
       // persistdata.data3=value;
        io.to(room).emit('receive-action-items',value);
    });
    socket.on('went-well-comment',(value,room)=>{
        io.to(room).emit('receive-went-well-comment',value);
    })
});

module.exports = server;