import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Profile.css'




function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')


  useEffect(() => {

    if (!userId) {

      navigate("/logIn");

    } else {
      axios.get(`https://marvelous-peat-peridot.glitch.me/user?userId=${userId}`,{ headers: { 'Authorization': `Bearer ${token}`} }).then((res) => { setUser(res.data.data); });

    }

  }, [navigate,userId,token]);


  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    navigate("/logIn");
  }
  return (
    <div className="profile-container">
     { user &&  <h1 style={{color:"white",margin:"1rem"}}>Hii!! {user.fname}</h1>}

      {user ? <div className="profile-details">
        <img
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-text">
          <h2>{user.fname + " " + user.lname}</h2>
          <p>Email:{user.email}</p>
          <p>Phone: {user.mobile}</p>
        </div>
        <br />
        <button className="logout-btn" onClick={handleLogout}><h3>Logout</h3></button>
      </div> : <h1>Loading....</h1>}
    </div>
  );
}

export default Profile;
