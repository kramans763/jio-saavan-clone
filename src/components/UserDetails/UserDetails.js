import React, { useState } from 'react'
import "./UserDetails.css";
import { Link, useNavigate } from 'react-router-dom';
const UserDetails = () => {
  const userDetails=JSON.parse(localStorage.getItem("userData"));
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate=useNavigate();
  const handleLogout = () => {
    // Remove authToken from localStorage
    localStorage.removeItem('authToken');
    // Reset authToken state
    setAuthToken(null);
    // Redirect to the home page
    navigate('/');
  };
  return (
    <div className='my-profile'> 
              <div className='my-details'>
                <div className='user-icon'>
                  <i className="fas fa-user"></i> 
                </div>
                <div className='user-details'>
                  <h2>{userDetails?.name}</h2>
                  <p>FREE</p>
                  <Link to="/underconstruction"><button className="go-pro-btn" >Go Pro</button></Link>
                </div>
              </div> 
              <div className='user-logout'>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            </div>
  )
}

export default UserDetails