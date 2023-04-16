import React,{useState}  from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const LogIn=(props)=>{
    const [email,setemail]=useState("")
    const [password,setPassword]=useState("")
   

    const navigate=useNavigate()
     const handleSumbit= async(e)=>{
        
     e.preventDefault();
         try {
         
         let response= await axios.post("http://localhost:5000/login",{email,password});


         localStorage.setItem('token',  response.data.data.token);
         localStorage.setItem('userId',  response.data.data.userId);

      if(response)  navigate("/")
  
            
         } catch (error) {
            alert(error.response.data.message)
         } 

     }
       


    return (
        <div className="auth-form-container">
          
      <form onSubmit={handleSumbit} className="login-form">
         <label htmlFor="email" > email</label>
         <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" id="email" name="email" placeholder="youremail@gmail.com" className="form_input" required/>

         <label htmlFor="password" > password</label>
         <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" placeholder="*********" className="form_input" required/>

         <button onClick={handleSumbit} className="form-btn">Log In</button>
      </form>
      <button onClick={()=>props.onFormSwitch("register")} className="link-btn">Don't have an account? Register</button>
      </div>
    )

};