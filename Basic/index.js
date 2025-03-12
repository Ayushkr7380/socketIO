import { config } from "dotenv";
config();

import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socket.io
io.on("connection",(anything)=>{
    //Receive message to server from frontend
    anything.on("user-message",(message)=>{
        // console.log(`${message} from ${anything.id}`);

        
        //Sends the received message from user-message(frontend) to all users
        io.emit("message-to-all",message); 
    })
});



app.use(express.static(path.resolve("./Public")));

app.get("/",(req,res)=>{
    return res.sendFile("Public/index.html");
});

export default server;