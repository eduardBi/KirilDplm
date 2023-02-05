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
      title:'Kst found black hole',
      comments:['my little comment','second'],
   },
   {
      id:1,
      title:'Kst found black whore',
      comments:[],
   }
 ]
 
 


         let clients=[]



 wss.on('connection',ws=>{

   ws.onmessage = ({data}) => {
      wss.clients.forEach(function each(client) {
         
         if(JSON.parse(data).type=='seeIfCommentsUpdates' && JSON.parse(data).nummerOfcomments!=posts[JSON.parse(data).id].comments.length){
            let difference=posts[JSON.parse(data).id].comments.length-JSON.parse(data).nummerOfcomments
            let putchNewComment=[]
            for (let i = 0; i < difference ; i++) {
               
               
               let indexOfnewComment=posts[JSON.parse(data).id].comments.length-i-1;
               putchNewComment.push(posts[JSON.parse(data).id].comments[indexOfnewComment])
               
            }
            console.log(difference)
            
            client.send(JSON.stringify({type:'updateCommentSecton',comments:[...putchNewComment],id:JSON.parse(data).id}))
            

         }else{
            
            console.log('leave')
         }
         if(JSON.parse(data).type=='openOnePost'){
            
            if (client === ws && client.readyState === Websocket.OPEN) {
               let idOfOpendPost=JSON.parse(data).id
               
              client.send(JSON.stringify({...posts[idOfOpendPost],type:'showTitle'}));
            }
         }
         if(JSON.parse(data).type=='openAllPosts'){
            
            if (client === ws && client.readyState === Websocket.OPEN) {
              client.send(JSON.stringify( posts));
            }
         }
         if(JSON.parse(data).type=='leaveAcomment'){
            
            if (client === ws && client.readyState === Websocket.OPEN){
               posts[JSON.parse(data).id].comments.push(JSON.parse(data).commentText)
               console.log(JSON.parse(data).id)
            }  
            
           

         }
      }
         
)};

}
         
)





 server.listen(3000,()=>console.log('listeningOmportc3000'))
 // запускает сервер на localhost:3000

