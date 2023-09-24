import React from 'react'
import "./UserDetails.css";
import { Link } from 'react-router-dom';
const UserDetails = () => {
  const userDetails=JSON.parse(localStorage.getItem("userData"));
  return (
    <div className='my-profile'> 
              <div className='my-details'>
                <div className='user-icon'>
                  <i className="fas fa-user"></i> 
                </div>
                <div className='user-details'>
                  <h2>{userDetails.name}</h2>
                  <p>FREE</p>
                  <Link to="/gopro"><button className="go-pro-btn" >Go Pro</button></Link>
                </div>
              </div> 
              <div className='user-logout'>
                <Link to="logout"><button>Log Out</button></Link>
              </div>
            </div>
  )
}

export default UserDetails