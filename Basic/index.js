import { config } from "dotenv";
config();

import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};
//socket.io
io.on("connection",(anything)=>{

    //setUserName , received from frontend to server
    anything.on("setUserName",(userName)=>{
        users[anything.id] = userName;
        io.emit("userList",users);
    });


    //Receive message to server from frontend
    anything.on("user-message",(message)=>{
        // console.log(`${message} from ${anything.id}`);


        //Sends the received message from user-message(frontend) to all users
        io.emit("message-to-all",{
            user : users[anything.id] || "Anonymous",
            text : message,
        }); 
    })
});



app.use(express.static(path.resolve("./Public")));

app.get("/",(req,res)=>{
    return res.sendFile("Public/index.html");
});

export default server;