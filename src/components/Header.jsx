import React from 'react';
import '../Header.css'
import { NavLink } from 'react-router-dom'



function Header() {
 const token=localStorage.getItem('token')
  
  return (
    <div className='header'>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="link"> Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="link">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/About" className="link">About</NavLink>
            </li>
            { !token &&<li className="nav-item">
              <NavLink to="/login"  className="link"> LogIn</NavLink>
            </li>}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
