import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const App = () => {
  const socket = useMemo(()=>io("http://localhost:8000/"),[]);

  const [messageFromServer , setMessageFromServer] = useState([]);
  const [inputMessage,setInputMessage] = useState("");
  const  [socketId,setSocketId] = useState('');
  const [joinedUser,setJoinedUser] = useState([]);

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('Connected',socket.id);
      setSocketId(socket.id);
      socket.emit("userId",socket.id);
    });
    
    socket.on("userId",(id)=>{
      console.log(`${id} joined the chat.`);
      setJoinedUser((prev)=>[...prev,id]);
    });

    socket.on("message-to-all",({socketId,inputMessage})=>{    
      setMessageFromServer((prev)=>[...prev,{socketId,inputMessage}]);
    });

    return ()=>{
      socket.disconnect();
    }
  },[]);

  const inputHandleChange =(e)=>{
    setInputMessage(e.target.value);
  }

  const handleSubmit =()=>{
    if(socket && inputMessage){
      socket.emit("message",{
        socketId,
        inputMessage
      });
      setInputMessage("");
    }
  }

  console.log("----",messageFromServer);
  return (
    <>
        <div>
          <h4>Your socket id is <span style={{backgroundColor:'black',color:'white'}}>{socketId}</span></h4>
            <div>
              <input 
                type="text"
                onChange={inputHandleChange}
                value={inputMessage}
              />
              <button onClick={handleSubmit} >Send Message</button>
            </div>
            <div>
            {
              joinedUser.map((user,idx)=>(
                <h4 key={idx}>
                    {user} Joined the chat
                </h4>
              ))
            }
            </div>
            {messageFromServer.map((msg, idx) => (
            <p key={idx}>
              <strong>{msg.socketId}:</strong> {msg.inputMessage}
            </p>
            ))}
          
        </div>
    </>
  )
}

export default App