import React from 'react'
import styled from 'styled-components'
import robot from "../assets/assets1/robot.gif"
import loader from "../assets/assets1/loader.gif"
function Welcome({ currentuser }) {
    if(!currentuser) return (<Container><img src={loader} alt="loading..." /></Container>)
  return (
    <Container> 
    {/* {currentuser.username} */}
    <img src={robot} alt="robot" />
    <h1>Welcome <span>{currentuser.username}!</span></h1>
    <h3>Please select a chat to start messaging.</h3>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome;

