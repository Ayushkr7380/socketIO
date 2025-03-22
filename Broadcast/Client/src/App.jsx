import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const App = () => {
  const socket = useMemo(()=> 
    io("http://localhost:8000/")
  ,[]);


  const [messageFromServer , setMessageFromServer] = useState("");
  const [inputMessage,setInputMessage] = useState("");

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('Connected',socket.id);
    });

    //socket.emit("message","kya haal hai");
    
    socket.on("message-to-all",(data)=>{
      setMessageFromServer(data);
    });

    return ()=>{
      socket.disconnect();
    }
  },[])

  const inputHandleChange =(e)=>{
    setInputMessage(e.target.value);
  }

  const handleSubmit =()=>{
    if(socket && inputMessage){
      socket.emit("message",inputMessage);
      setInputMessage("");
    }
  }

  return (
    <>
        <div>
            <div>
              <input 
                type="text"
                onChange={inputHandleChange}
                value={inputMessage}
              />
              <button onClick={handleSubmit} >Send Message</button>
            </div>
             {messageFromServer && <p>{messageFromServer}</p>}
          
        </div>
    </>
  )
}

export default App