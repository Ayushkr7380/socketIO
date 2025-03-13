import { config } from "dotenv";
config();
import cors from "cors";
import express from "express";
import http from "http";
import initializeSocket from "./socketIO/socket.js";

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

initializeSocket(server);


app.get("/",(req,res)=>{
    return res.send("Working");
});

export default server;