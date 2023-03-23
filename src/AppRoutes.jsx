import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Register, Login, Chat, SetAvatar } from './utils/PagesExports';


function AppRoutes(props) {
  return (
    <>
        <Routes>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/set_avatar' element={<SetAvatar/>} />
            <Route path='/' element={<Chat/>} />
        </Routes>
    </>
  )
}

export default AppRoutes