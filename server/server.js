const Websocket=require('ws');
const path=require('path');

const wss= new Websocket.Server({port:8800});

const express=require('express');
const app=express();
const server=require('http').createServer(app)

 
 

 wss.on('connection',ws=>{
    wss.clients.forEach(eachClient=>{
            eachClient.send(JSON.stringify({msg:'hi'}))});
 })
 
 app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname, '../server.html'));

 })

 server.listen(3000,()=>console.log('listeningOmportc3000'))
 