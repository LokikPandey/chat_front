import React, { useEffect, useState,setTimeout } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { avatarroute } from '../assets/routes'
import styled from 'styled-components'
import loader from '../assets/assets1/loader.gif'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Buffer } from 'buffer'
function setAvatar() {
    const api= 'https://api.multiavatar.com/4645646'
    const navigate = useNavigate();
    const toastOptions = {
      position : "bottom-right",
      autoClose : 8000,
      pauseOnHover : true,
      draggable : true,
      theme : "dark",
    };
    useEffect(()=>{
      if(!localStorage.getItem("chat-app-user"))
      {
        navigate("/login");
      }
    
    },[]);
    const [avatar,setAvatar] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [selectedavatar,setSelectedavatar] = useState(undefined);
    const setProfilepic = async()=>{
      if (selectedavatar === undefined) {
        toast.error("Please Select an avatar",toastOptions);
      }
      
      else{
          const user = await JSON.parse(localStorage.getItem("chat-app-user"));
          const {data} = await axios.post(`${avatarroute}/${user._id}`,{
            image : avatar[selectedavatar],
          });
        if(data.isSet)
        {
          user.isAvatarset = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user",JSON.stringify(user));
          navigate("/");
        }
        else
        {
          toast.error("Error Setting Avatar. Please try again",toastOptions);
        }
      }
    };
    
    const delay = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));
    useEffect(()=>{
        const fetchav = async()=>{
          const data = [];
          setIsLoading(true);
          for (let index = 0; index < 4; index++) {
              let success = false;
              while (!success) {
                  try {
                      const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                      const buffer = Buffer.from(response.data);
                      data.push(buffer.toString('base64'));
                      success = true;
                  } catch (error) {
                      if (error.response && error.response.status === 429) {
                          await delay(1000);
                      } else {
                          toast.error("Failed to fetch avatar.", toastOptions);
                          success = true;
                      }
                  }
              }
          }
          setAvatar(data);
          setIsLoading(false);
        };
        fetchav();
    },[api])

  return (
    <> 
    {isLoading? (<Container><img src={loader} alt='loading' className="loader"></img></Container>):
    (
    <Container>
      <div className="title">
        <h1>Pick an avatar for your profile.</h1>
      </div>
      <div className="avatars">
        {avatar.map((avatars,index)=>{
          return(
            <div className={`avatar ${selectedavatar === index ?"selected":""}`} key={index}
            onClick={() => {
              if (selectedavatar === index) {
                setSelectedavatar(undefined);
              } else {
                setSelectedavatar(index);
              }
            }}>
              <img src={`data:image/svg+xml;base64,${avatars}`} alt="avatar" />
            </div>
          );
          })}
      </div>
      <button onClick={setProfilepic} className='submit-btn'>Set as profile picture.</button>    
    </Container>
    )}
    <ToastContainer></ToastContainer>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background: linear-gradient(135deg, #000000, #1b1b1b);
  height: 100vh;
  width: 100vw;
  
  .loader {
    max-inline-size: 100%;
  }
  
  .title {
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      cursor: pointer;

      img {
        height: 6rem;
        transition: transform 0.25s ease-out;
        
        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background-color: #997af0;
      box-shadow: 0 0 10px #997af0, 0 0 40px #997af0, 0 0 80px #997af0;
    }
  }
`;

export default setAvatar