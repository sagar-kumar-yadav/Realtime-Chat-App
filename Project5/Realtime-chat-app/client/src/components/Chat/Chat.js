import React, { useEffect } from 'react';
import socketIo from "socket.io-client";
import { user } from '../Join/Join';
import "./Chat.css";
import sendLogo from "../../images/send.png"

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {

  useEffect(() => {
    const socket = socketIo(ENDPOINT, { transports : ['websocket'] });

    socket.on('connect', () => {
      alert('connected');
    })
    console.log(socket);
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
      console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
      console.log(data.user, data.message);
    })

    return () => {
      socket.emit('dis-connect');
      socket.off();
    }
  }, []);
  

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'></div>
        <div className='chatBox'></div>
        <div className='inputBox'>
          <input type="text" id='chatInput'/>
          <button className='sendBtn'><img src={sendLogo} alt="send" /></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
