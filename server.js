const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server,{cors:{
    origin: '*'
}})

server.listen(3000);
io.on('connection', socket => {
    socket.on('join-room',room =>{
        socket.join(room);
    });
    socket.on('make-button-enabled',(value,room)=>{
        io.to(room).emit('receive-make-button-enabled',value);
    })
    socket.on('make-blur',(value,room)=>{
        io.to(room).emit('receive-make-blur',value);
    })
    socket.on('went-well',(value,room)=>{
        io.to(room).emit('receive-went-well',value);
    });
    socket.on('to-improve',(value,room)=>{
        //persistdata.data2=value;
        // value.forEach(element => {
        //     socketids.forEach(elem=>{
        //         if(!(elem in element.likedUsers)){
        //             element.likedUsers[elem]=0;
        //         }
        //     })
        // });
        io.to(room).emit('receive-to-improve',value);
        //socket.broadcast.emit('receive-to-improve',value)
    });
    socket.on('action-items',(value,room)=>{
       // persistdata.data3=value;
        io.to(room).emit('receive-action-items',value);
    });
});

module.exports = server;