const Websocket=require('ws');
 const wss= new Websocket.Server({port:8800});

 wss.on('connection',ws=>{
    wss.clients.forEach(eachClient=>{
            eachClient.send(JSON.stringify({msg:'hi'}))});

    ws.on('message', msg=>{
        console.log(JSON.parse(msg));
    })
    
 })
 