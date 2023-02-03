const Websocket=require('ws');
const path=require('path');
const wss= new Websocket.Server({port:8800});
const express=require('express');
const app=express();
const server=require('http').createServer(app)
//импорт библиотек

 
 

 wss.on('connection',ws=>{
    wss.clients.forEach(eachClient=>{
            eachClient.send(JSON.stringify({msg:'hi'}))});
 })
 //отсылает новости каждому подключённому клиенту 

 app.use(express.urlencoded({
    extended: true
  }));
  // исправляет ошибку "udefined"
 
 app.get('/adminpost',(req,res)=>{

    res.sendFile(path.join(__dirname, '../server.html'));

 })
//позволяет ввестии новости от администратора 

 app.post('/adminpost',(req,res)=>{
    console.log('postedDATA', req.body);
    res.sendFile(path.join(__dirname, '../server.html'));
 })
 //обрабатывает новости администратора 


 server.listen(3000,()=>console.log('listeningOmportc3000'))
 // запускает сервер на localhost:3000
 