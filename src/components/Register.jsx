import React,{useState}  from "react";

import axios from "axios"

export const Register=(props)=>{

   
    const [email,setemail]=useState("")
    const [password,setPassword]=useState("")
    const [fname,setfname]=useState("")
    const [lname,setlname]=useState("")
    const [mobile,setmobile]=useState("")



    const handleSumbit= async(e)=>{
      e.preventDefault();
          try {
          
          let response= await axios.post("http://localhost:5000/register",{email,password,fname,lname,mobile});
          
          setemail("");
          setPassword("")
          setfname("")
          setlname("")
          setmobile("")
          
          if(response) {
            alert("Registerd Successfully, You can logIn now")
            props.onFormSwitch("logIn")
         }
            
             
          } catch (error) {
            
           alert(error.response.data.message)
           
          } 
 
      }


    return (
        <div className="auth-form-container">
      <form onSubmit={handleSumbit} className="register-form">

      <label htmlFor="fname" > firstName</label>
         <input value={fname} onChange={(e)=>setfname(e.target.value)} type="text" id="fname" name="fname" placeholder="firstName" className="form_input" required/>

      <label htmlFor="lname" > lastName</label>
         <input value={lname} onChange={(e)=>setlname(e.target.value)} type="text" id="lname" name="lname" placeholder="lastName" className="form_input" required/>

         <label htmlFor="email" > email</label>
         <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" id="email" name="email" placeholder="youremail@gmail.com" className="form_input" required/>

         <label htmlFor="mobile" > moblie</label>
         <input value={mobile} onChange={(e)=>setmobile(e.target.value)} type="text" id="mobile" name="mobile" placeholder="yourNumber" className="form_input" required/>

         <label htmlFor="password" > password</label>
         <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" placeholder="*********" className="form_input" required/>

         <button type="sumbit" className="form-btn">Register</button>
      </form>
      <button onClick={()=>props.onFormSwitch("logIn")} className="link-btn">Already have an account? LogIn here</button>
      </div>
    )

};