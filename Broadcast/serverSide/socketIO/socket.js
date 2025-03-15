import { Server } from "socket.io";

const initializeSocket = (server)=>{

    const io = new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            methods:["GET","POST"],
            credentials:true
        }
    });

    io.on("connection",(socket,)=>{
        console.log("New user is connected",socket.id);

        //Receive message from client   
        socket.on("message",(message)=>{
            console.log("Message is ",message);

            io.emit("message-to-all",message);
        });
    })

}
export default initializeSocket;