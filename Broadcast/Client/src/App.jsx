import React, { useEffect } from 'react'
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000/");
const App = () => {


  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('Connected',socket.id);
    });

    socket.emit("message","hello");
  },[])

  return (
    <>
        <div>
          HELLO
        </div>
    </>
  )
}

export default App