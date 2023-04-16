
import React from 'react';
import "./App.css"
import Header from './components/Header';
import Home from './components/Home'
import { Routes,Route } from "react-router-dom";
import {LogOrRegister} from './components/LogOrRegister'
import { Error } from './components/Error';
import Profile from "./components/Profile"
import About from './components/About'

function App() {



  return (
    <>
 <Header/>
    <Routes>
       
        <Route path='/' element={<Home/>} />

        <Route path='/profile' element={<Profile/>} />
        <Route path='/About' element={<About/>} />


  <Route path='/logIn' element={<LogOrRegister/>} />
   
     <Route path="*" element={<Error/>}/>
    </Routes>
    </>
  );
}

export default App;
