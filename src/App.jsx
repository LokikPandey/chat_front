import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Chat from './pages/chat'
import Setavatar from './pages/Setavatar';
import Logout from './pages/Logout';
import Default from './pages/Default';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<Chat/>}></Route>
        <Route path='/register' element = {<Register/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/chat' element = {<Chat/>}></Route>
        <Route path='/setavatar' element ={<Setavatar/>}></Route>
        {/* <Route path='/logout' element={<Logout/>}/> */}
      </Routes>
    </Router>
  )
}

export default App