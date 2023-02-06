const Websocket=require('ws');
const path=require('path');
const wss= new Websocket.Server({port:8000});
const express=require('express');
const http=require('http');
const app=express();
const server=require('http').createServer(app);

let posts=[
   
   {
      id:1,
      title:'Kst found black whore',
      comments:[],
   },
   {
      id:2,
      title:'Kst found black whore',
      comments:[],
   },
 ]

http.get('http://localhost:3000/data', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });
  

  res.on('end', () => {
    
    const postsFromserver = JSON.parse(Buffer.concat(data).toString());
    posts.push(postsFromserver[0]);
    console.log(posts)
  });
  
}).on('error', err => {
  console.log('Error: ', err.message);
});








//импорт библиотек



 
let sockets=[]
 function putchSockets(post){
   
   for (let i = 0; i < post.length; i++) {
      
   
      let socketUrl='880'+post[i].id;
      sockets[post[i].id]=new Websocket.Server({port:socketUrl});

      sockets[post[i].id].on('connection',ws=>{

         ws.onmessage = ({data}) => {
             data=JSON.parse(data);
             
             sockets[data.id].clients.forEach(function each(client) {
               if(data.type=='seeIfCommentsUpdates' && data.nummerOfcomments!=posts[data.id].comments.length){
                  
                  let difference=posts[data.id].comments.length-data.nummerOfcomments
                  let putchNewComment=[];
                  for (let i = 0; i < difference ; i++) {

                     let indexOfnewComment=posts[data.id].comments.length-i-1;
                     putchNewComment.push(posts[data.id].comments[indexOfnewComment])
                     
                  }
                  
                  
                  client.send(JSON.stringify({type:'updateCommentSecton',comments:[...putchNewComment],id:data.id}))
                  
                  
               }
               if(data.type=='openOnePost'){
                  
                  if (client === ws && client.readyState === Websocket.OPEN) {
                     let idOfOpendPost=data.id
                     
                    client.send(JSON.stringify({...posts[idOfOpendPost],type:'showTitle'}));
                  }
               }
               
               if(data.type=='leaveAcomment'){
                  
                  if (client === ws && client.readyState === Websocket.OPEN){
                     posts[data.id].comments.push(data.commentText)
                     console.log(posts[data.id].comments);
                  }      
      
               }
            }
               
      )};
      
      }
               
      )
      
   }
}
putchSockets(posts)

 
 


wss.on('connection',ws=>{
   
   ws.onmessage = ({data}) => {
      wss.clients.forEach(function each(client) {
         data=JSON.parse(data)
         
         if(data.type=='openAllPosts'){
            
            if (client === ws && client.readyState === Websocket.OPEN) {
              client.send(JSON.stringify( posts));
            }
         }
         if (data.type=='uploadNewPost') {
            console.log(sockets.length)
            let newPost={id:posts.length,
               title:data.postText,
               comments:[],}
               console.log(newPost)
               posts.push(newPost)
               putchSockets([newPost])
         }
         console.log(sockets.length)
         
         
      }
         
)};


})







 server.listen(5000,()=>console.log('listeningOmportc3000'))
 // запускает сервер на localhost:3000

