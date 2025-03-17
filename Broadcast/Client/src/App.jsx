import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const App = () => {
  const socket = useMemo(()=> 
    io("http://localhost:8000/")
  );

  const [messageFromServer , setMessageFromServer] = useState("")

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
            <div>
              
              <input type="text" />
            </div>

             {messageFromServer && <p>{messageFromServer}</p>}
          
        </div>
    </>
  )
}

export default App