import {React,useState,useEffect} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/assets1/logo.svg'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios';
import { registerroute } from '../assets/routes.js';

function register() {
  const navigate = useNavigate();
  const toastOptions = {
    position : "bottom-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : "dark",
  };

  const [values,setValues] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
  });

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user'))
    {
      navigate('/');
    }
  },[]);

    const handlesubmit= async (event)=>{
      event.preventDefault();
    try{  if(handlevalidation())
      {
        const {username,email,password} = values;
        const {data} = await axios.post(registerroute,{
          username,
          email,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if(data.status === true)
        {
          localStorage.setItem('chat-app-user',JSON.stringify(data.user));
          navigate('/');
        }
      }}catch(e){
      }
    }

    const handlevalidation=()=>{
      const {username,email,password,confirmpassword} = values;
      if(password!=confirmpassword)
      {
        toast.error('Password and confirm Password do not match',toastOptions);
        return false;
      }
      else if(username.length<3)
      {
        toast.error("Username must be greater than 3 characters",toastOptions);
        return false;
      }
      else if(email==="")
      {
        toast.error("Email is required",toastOptions);
        return false;
      }
      else if(password.length<8)
      {
        toast.error("Passwordd must be greater than 8 characters",toastOptions);
        return false;
      }
      return true;

    }
    const  handlechange=(event)=> {
      setValues({...values,[event.target.name]:event.target.value})
    }
  
    return (
    <>
      <FormContainer>
        <form action='' onSubmit={(e)=>handlesubmit(e)}>
          <div className='brand'>
            <img src={logo} alt='logo' />
            <h1>connectly</h1>
          </div>
          <input type="text" placeholder='username' name='username' onChange={(e)=>handlechange(e)}/>
          <input type="email" placeholder='email' name='email' onChange={(e)=>handlechange(e)}/>
          <input type="password" placeholder='password' name='password' onChange={(e)=>handlechange(e)}/>
          <input type="password" placeholder='confirm password' name='confirmpassword' onChange={(e)=>handlechange(e)}/>
          <button type='submit'>Create User</button>
          <span>Already have an account ? <Link to='/login'>Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div`
  * {
    padding: 0;
    margin: 0;
  }
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  background: linear-gradient(135deg, #000000, #1b1b1b);
  
  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 3rem 5rem;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  input {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 1rem;
    border-radius: 20px;
    border: none;
    font-size: 1rem;
    width: 100%;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border: 1px solid #4e0eff;
      background-color: rgba(255, 255, 255, 0.3);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  button {
    background-color: green;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.5rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #997af0;
    }
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: green;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;

      &:hover {
        color: #997af0;
      }
    }
  }
`;
export default register;