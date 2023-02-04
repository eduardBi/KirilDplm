const Websocket=require('ws');
const path=require('path');
const wss= new Websocket.Server({port:8800});
const express=require('express');
const { copyFileSync } = require('fs');
const app=express();
const server=require('http').createServer(app)
/*
const { Server } = require("socket.io");
const io = new Server(server);
*/
//импорт библиотек


 let posts=[
   {
      id:0,
      title:'Kst found black hole'
   },
   {
      id:1,
      title:'Kst found black whore'
   }
 ]
 

 wss.on('connection',ws=>{
   
         ws.onmessage = ({data}) => {
            wss.clients.forEach(function each(client) {
               if(JSON.parse(data).type=='openOnePost'){
                  console.log('yes one')
                  if (client === ws && client.readyState === Websocket.OPEN) {
                     let idOfOpendPost=JSON.parse(data).id
                     
                    client.send(JSON.stringify(posts[idOfOpendPost]));
                  }
               }
               if(JSON.parse(data).type=='openAllPosts'){
                  console.log('openAllPosts')
                  if (client === ws && client.readyState === Websocket.OPEN) {
                    client.send(JSON.stringify( posts));
                  }
               }
               if(JSON.parse(data).type=='leaveAcomment'){
                  console.log('leaveAcomment')
                  if (client === ws && client.readyState === Websocket.OPEN) {
                    client.send(JSON.stringify( posts));
                  }
               }
      });

   }})
 //отсылает новости каждому подключённому клиенту 

 
//показывает каждую новость  


 app.get('/',(req,res)=>{

   res.sendFile(path.join(__dirname, '../fullList.html'));

 })

 app.use(express.urlencoded({
    extended: true
  }));
  // исправляет ошибку "udefined"

app.post('/postcomment/:id/comments',(req,res)=>{
   console.log('postedDATA', req.body);
   res.sendFile(path.join(__dirname, '../individualPost.html'));
})
//отправляет комментарии 




  
 app.get('/adminpost',(req,res)=>{

    res.sendFile(path.join(__dirname, '../server.html'));

 })
//позволяет ввестии новости от администратора 
 
 app.post('/adminpost',(req,res)=>{
   console.log('postedDATA', req.body);
   res.sendFile(path.join(__dirname, '../server.html'));
})

//обрабатывает новости администратора 

 

 app.get('/posts/:id',(req,res)=>{

   res.sendFile(path.join(__dirname, '../individualPost.html'));

 })
 //позволяет открыть каждый пост отдельно в новом файле 






 server.listen(3000,()=>console.log('listeningOmportc3000'))
 // запускает сервер на localhost:3000
 