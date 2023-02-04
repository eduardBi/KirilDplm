const Websocket=require('ws');
const path=require('path');
const wss= new Websocket.Server({port:8800});
const express=require('express');
const app=express();
const server=require('http').createServer(app)
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
    wss.clients.forEach(eachClient=>{
            eachClient.send(JSON.stringify({msg:'hi'}))});
 })
 //отсылает новости каждому подключённому клиенту 

 app.get('/',(req,res)=>{


 })

 app.use(express.urlencoded({
    extended: true
  }));
  // исправляет ошибку "udefined"

app.post('/postcomment',(req,res)=>{
   console.log('postedDATA', req.body);
   res.sendFile(path.join(__dirname, '../individualPost.html'));
})
//отправляет комментарии 

app.get('/postcomment',(req,res)=>{
   console.log('postedDATA', req.body);
   res.sendFile(path.join(__dirname, '../individualPost.html'));
})
//позволяет просматривать посты 

  
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



 
//добавляет комментарий



 server.listen(3000,()=>console.log('listeningOmportc3000'))
 // запускает сервер на localhost:3000
 