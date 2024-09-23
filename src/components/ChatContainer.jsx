import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import Logout from '../pages/Logout';
import Chatinput from '../pages/Chatinput';
import Message from '../pages/Message';
import axios from 'axios';
import { addmessage, getmessage } from '../assets/routes';
import {v4 as uuidv4} from "uuid";

function ChatContainer({currentchat,currentuser,socket}) {
    const [messages,setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage,setArrivalMessage] = useState(null);
    useEffect(()=>{
        const abcd = async()=>{
        const responce = await axios.post(getmessage,{
            from:currentuser._id,
            to:currentchat._id
        });
        setMessages(responce.data);
        }
        abcd();

    },[currentchat]);

    const handleMSG = async(msg)=>{
        await axios.post(addmessage,{
            from:currentuser._id,
            to:currentchat._id,
            message:msg
        });

        socket.current.emit("send-msg",{
            to:currentchat._id,
            from:currentuser._id,
            message:msg
        });

        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs);

    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
              setArrivalMessage({fromSelf:false,message:msg});
            });
        }
    },[]);

    useEffect(()=>{
      arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage]);

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages]);



  return (
    <>
    {currentchat && (        
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentchat.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentchat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                          <div ref={scrollRef} key={uuidv4()}>
                            <div
                            className={`message ${
                              message.fromSelf ? "sended" : "recieved"
                            }`}
                          >
                            <div className="content">
                              <p>{message.message}</p>
                            </div>
                          </div>
                          </div>
                        )
                    })
                }
            </div>
            <Chatinput handleSendMsg={handleMSG}/>
        </Container>
    )}
    </>
  )
}const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.2rem;
  overflow: hidden;
  background: linear-gradient(135deg, #1f1f1f 0%, #313131 100%);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
    .chat-messages {
    color:purple;
      overflow-y: scroll;  /* Adds scrollbar when content overflows */
    }
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: #2d2d2d;
    border-radius: 8px;
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);
    .user-details {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      color: #f0f0f0;
    }
  }

  .avatar {
    img {
      height: 3.5rem;
      border-radius: 50%;
      border: 2px solid #34c759;
    }
  }

  .username {
    h3 {
      font-size: 1.5rem;
      color: #ffffff;
    }
  }

  .chat-messages{
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    color:red;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    box-shadow: inset 0px 1px 6px rgba(0, 0, 0, 0.2);

    &::-webkit-scrollbar {
      width: 0.3rem;
      background-color: #2f2f2f;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #575757;
      border-radius: 1rem;
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 50%;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 12px;
        line-height: 1.5;
        word-wrap: break-word;
        color: #f5f5f5;
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background: linear-gradient(135deg, #34c759 0%, #28a745 100%);
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background: linear-gradient(135deg, #4c6ef5 0%, #3b5bdb 100%);
      }
    }
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 0 2rem;
    background: #2d2d2d;
    border-radius: 8px;
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.2);

    input {
      width: 90%;
      background: #1e1e1e;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-size: 1.1rem;
      color: #ffffff;
      outline: none;
      margin-right: 1rem;
    }

    button {
      background: #34c759;
      color: #fff;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #28a745;
      }
    }
  }
`;
export default ChatContainer;