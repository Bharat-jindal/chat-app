const path =require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const {generateMessage}= require('./utils/message')

const port = process.env.PORT || 3000
const publicPath=path.join(__dirname,'/../public')

const app=express();

const server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.emit('newMessage',generateMessage('admin','Welcome to the chat room'))
    socket.broadcast.emit('newMessage',generateMessage('admin','New user added'))
    socket.on('disconnect',()=>{
        console.log('client disconnected')
    })

    socket.on('createMessage',(message,callback)=>{
        console.log('new message',message);
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback('this is from the server')
    })
})

server.listen(port,()=>{
    console.log(`app started on port ${port}`)
})