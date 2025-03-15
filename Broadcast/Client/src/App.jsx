import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000/");
const App = () => {

  const [messageFromServer , setMessageFromServer] = useState("");
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('Connected',socket.id);
    });

    socket.emit("message","kya haal hai");
    
    socket.on("message-to-all",(data)=>{
      setMessageFromServer(data);
    })

  },[])

  return (
    <>
        <div>
          HELLO
          
             {messageFromServer && <p>{messageFromServer}</p>}
          
        </div>
    </>
  )
}

export default App