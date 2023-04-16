
import React,{useState} from "react";


import '../LogOrRegister.css';

import { LogIn } from './LogIn';
import {Register} from './Register'

export const LogOrRegister= ()=>{
  

    const [currentForm,setcurrentForm]=useState("logIn")

    const toggleForm=(formName)=>{
       setcurrentForm(formName)  
    }

    return (
        <div className="container_log">
        {currentForm === "logIn" ? <LogIn onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}

        </div>
    )




}