import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const App = () => {
  const socket = useMemo(()=> 
    io("http://localhost:8000/")
  ,[]);


  const [messageFromServer , setMessageFromServer] = useState([]);
  const [inputMessage,setInputMessage] = useState("");

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('Connected',socket.id);
    });

    //socket.emit("message","kya haal hai");
    
    socket.on("message-to-all",(data)=>{
      setMessageFromServer((prev)=>[...prev,data]);
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

  console.log("----",messageFromServer);
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
             {
             messageFromServer && messageFromServer.map((msg,idx)=>(
                <p key={idx}>{msg}</p>
             ))}
          
        </div>
    </>
  )
}

export default App