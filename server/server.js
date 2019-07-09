const path =require('path');
const express=require('express');

const port = process.env.PORT
const publicPath=path.join(__dirname,'/../public')

const app=express();
app.use(express.static(publicPath))

app.listen(port,()=>{
    console.log(`app started on port ${port}`)
})