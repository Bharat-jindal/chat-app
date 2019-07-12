const path =require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const {generateMessage,generateLocation}= require('./utils/message');
const {isRealString} =require('./utils/validation');
const {Users}=require('./utils/users')

const port = process.env.PORT || 3000
const publicPath=path.join(__dirname,'/../public')

const app=express();

const server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));
var users=new Users();

io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        var user=users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} leave the room.`))
        }
    })

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required')
        }
        socket.join(params.room);
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUsersList',users.getUserList(params.room))
        socket.emit('newMessage',generateMessage('admin','Welcome to the chat room'))
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`))
            callback()
        
    })

    socket.on('createMessage',(message,callback)=>{
        const user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
        }

        callback()
    })
    socket.on('createLocationMessage',(coords)=>{
        const user=users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocation',generateLocation(user.name,coords.latitude ,coords.longitude))
        }
    })
})

server.listen(port,()=>{
    console.log(`app started on port ${port}`)
})