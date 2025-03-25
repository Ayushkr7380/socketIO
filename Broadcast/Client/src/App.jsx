import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const App = () => {
  const socket = useMemo(()=>io("http://localhost:8000/"),[]);

  const [messageFromServer , setMessageFromServer] = useState([]);
  const [inputMessage,setInputMessage] = useState("");
  const  [socketId,setSocketId] = useState('');
  const [joinedUser,setJoinedUser] = useState([]);

  useEffect(()=>{
    //Socket connection
    socket.on("connect",()=>{
      console.log('Connected',socket.id);
      //set socket id in useState
      setSocketId(socket.id);

      //Send socket id to server side
      socket.emit("userId",socket.id);
    });
    
    //Receive who joined the chat from server to frontend side 
    socket.on("userId",(id)=>{
      console.log(`${id} joined the chat.`);
      setJoinedUser((prev)=>[...prev,id]);
    });

    //Receive messages from server to frontend
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

  //handleSubmit function to send message from frontend to backend
  const handleSubmit =()=>{
    if(socket && inputMessage){
      //Socket.emit sends message to backend from frontend
      socket.emit("message",{
        socketId,
        inputMessage
      });
      setInputMessage("");
    }
  }

  // console.log("----",messageFromServer);
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