import React, { useEffect, useState ,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import {io} from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import { alluserroute ,host} from '../assets/routes.js';
import Welcome from '../components/Welcome.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
function chat() {

    const socket = useRef();
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    const [currentuser,setCurrentuser] = useState(undefined);
    const [currentchat,setCurrentchat]=useState(undefined);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
      const fetchdata = async ()=>
{      if(!localStorage.getItem("chat-app-user"))
      {
        navigate("/login");
      }
      else
      {
        const storeduser = (await JSON.parse(localStorage.getItem("chat-app-user")));
        setCurrentuser(storeduser);

      }}
      fetchdata();
    },[]);

    useEffect(()=>{
      if(currentuser)
      {
        socket.current = io(host);
        socket.current.emit("add-user",currentuser._id)
      }
    },[currentuser]);
    useEffect(()=>{
      const abcd = async()=>{
        if(currentuser)
          if(currentuser.isAvatarset)
          {

            const {data} = await axios.get(`${alluserroute}/${currentuser._id}`);
            setUsers(data);
            setIsLoading(false);
          }

          else navigate("/setavatar")
      }
      abcd();
    },[currentuser,navigate]);


    const handleChatChange = (chat) =>{
      setCurrentchat(chat);
    };


    return(
    <>
    <Container>
    <div className="container">
    <Contact contacts={users} currentuser={currentuser} changechat={handleChatChange}/>
      {isLoading===false && currentchat===undefined?(
          <Welcome currentuser={currentuser}></Welcome>)
          :<ChatContainer currentchat={currentchat} currentuser={currentuser} socket={socket} ></ChatContainer>
      }
      

    </div>

    </Container>

    </>
  )
}

const Container= styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  width:100vw;
  gap:1 rem;
  background-color:black;
  .container{
    // border:1px solid black;
    border-radius:10px;
    height:85vh;
    width:85vw;
    background-color:#2d2d2d;
    display:grid;
    grid-template-columns:25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
  }
`;

export default chat;