import { Server } from "socket.io";

const initializeSocket = (server)=>{

    const io = new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            methods:["GET","POST"],
            credentials:true
        }
    });

    io.on("connection",(socket)=>{
        console.log("New user is connected",socket.id);
       
        socket.on("userId",(id)=>{
            console.log(`${id} joined the chat.`);
            socket.broadcast.emit("userId",id);
        });
        //Receive message from client   
        socket.on("message",({socketId, inputMessage})=>{
            console.log(`${socketId} sent ${inputMessage}`);

            io.emit("message-to-all",{
                socketId,
                inputMessage
            });
        });
    })

}
export default initializeSocket;