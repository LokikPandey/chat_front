import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from "../assets/assets1/logo.svg"
function Contact({contacts,currentuser,changechat}) {

    const [currentuserimage,setCurrentuserimage]=useState(undefined);
    const [currentusername,setCurrentusername]=useState(undefined);
    const [currentselected,setCurrentSelected]=useState(undefined);

    useEffect(()=>{
      if(currentuser)
      {
        setCurrentuserimage(currentuser.avatarImage);
        setCurrentusername(currentuser.username);
      }
    },[currentuser]);

    const changecurrentchat = (index,contact) =>{
        setCurrentSelected(index);
        changechat(contact);
    }
  return (
    <>
        {currentuserimage && currentusername && (
                <Container>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h3>Connectly</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact,index)=>{
                                return(
                                    <div className={`contact ${index===currentselected?"selected":""}`} key={index} onClick={()=>changecurrentchat(index,contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentuserimage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h1>{currentusername}</h1>
                        </div>
                    </div>
                    </Container>
            )
        }
    </>
  )
}

export default Contact;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: linear-gradient(135deg, #1f1f1f 0%, #313131 100%);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h3 {
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 1rem;
    padding: 0.5rem;
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

    .contact {
      background-color: rgba(255, 255, 255, 0.1);
      min-height: 5rem;
      cursor: pointer;
      width: 95%;
      border-radius: 0.5rem;
      padding: 0.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        background: linear-gradient(135deg, #7a8cbf 0%, #4a5f8d 100%);
        transform: scale(1.02);
      }

      .avatar {
        img {
          height: 3.5rem;
          border-radius: 50%;
          border: 2px solid #7a8cbf;
        }
      }

      .username {
        h3 {
          color: #ffffff;
          font-size: 1.2rem;
        }
      }
    }

    .selected {
      background: linear-gradient(135deg, #34c759 0%, #28a745 100%);
      box-shadow: 0px 2px 12px rgba(52, 199, 89, 0.6);
      transform: scale(1.05);
    }
  }

  .current-user {
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: inset 0px 1px 6px rgba(0, 0, 0, 0.3);

    .avatar {
      img {
        height: 4rem;
        border-radius: 50%;
        border: 2px solid #34c759;
      }
    }

    .username {
      h1 {
        color: #ffffff;
        font-size: 1.5rem;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.8rem;
      .username {
        h1 {
          font-size: 1rem;
        }
      }
    }
  }
`;
