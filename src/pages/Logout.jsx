import React from 'react'
import { useNavigate } from 'react-router-dom';
import {BiPowerOff} from "react-icons/bi";
import styled from 'styled-components';
function Logout() {
    const navigate = useNavigate();
    const handleclick = async()=>{
    localStorage.clear();
    navigate('/login');
    }

  return (
    <Container>
      <BiPowerOff onClick={()=>handleclick()}/>
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0.1rem;
  margin:0 30px;
  border-radius:50%;
  background-color:red;
  border:none;
  cursor:pointer;
  svg{
    font-size:1.3rem;
    color:white;

  }

`

export default Logout