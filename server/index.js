import express from 'express'; 
import http from 'http'
import { Server as socketServer } from 'socket.io';

//servidor de http
const app = express(); 
const serverApp = http.createServer(app); 

//servidor de chat 
const io = new socketServer(serverApp); 
io.on("connection" , (socket) =>{
    console.log("Client connected");
    //recibimos los mensajes desde el frontend , evento que recibe lo que enviamos del frontend 
    socket.on("message", (data) =>{
        console.log(data);
        //evento que envia del backend al frontend
        socket.broadcast.emit("message_response", {
            data,
            user: socket.id.slice(6)
        })
    })
})

serverApp.listen(3000, ()=>{
    console.log("Server on port 3000");
})