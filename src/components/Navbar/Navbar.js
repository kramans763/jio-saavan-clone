import React, { useState,useEffect } from 'react'
import "./Navbar.css";
import CustomSelect from './CustomSelect';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const options = [
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'bhojpuri', label: 'Bhojpuri' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'haryanvi', label: 'Haryanvi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'gujrati', label: 'Gujrati' },
    { value: 'rajasthani', label: 'Rajasthani' },
    { value: 'urdu', label: 'Urdu' },
];
const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
const navigate = useNavigate();
const [showDropdown, setShowDropdown] = useState(false);

const handleLogout = () => {
  // Remove authToken from localStorage
  localStorage.removeItem('authToken');
  // Reset authToken state
  setAuthToken(null);
  // Redirect to the home page
  navigate('/');
};

useEffect(() => {
  // Check if authToken is in localStorage when the component mounts
  const authTokenFromLocalStorage = localStorage.getItem('authToken');
  if (authTokenFromLocalStorage) {
    setAuthToken(authTokenFromLocalStorage);
  }
}, []);

const toggleDropdown = () => {
  setShowDropdown(!showDropdown);
};

function handleMyProfile(){
  navigate("/me")
}

  return (
    <div className='navbar'>
      <div className='left-nav'>
        <div className='logo'>
            <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/JioSaavn_Logo.svg" alt='img'/></Link>  
        </div> 
        <div><Link to='/' className='link'>Music</Link></div>
        <div><Link to='/podcast' className='link'>Podcast</Link></div>
        <div><Link to='/gopro' className='link'>Go Pro</Link></div>
            
      </div> 

       <div className="search-bar">
           {/* <i className="fas fa-search"></i> */}
           <input type="text" placeholder="Search" />
      </div>

      <div className='right-nav'> 
          <div className='music-language'>
             <CustomSelect options={options}/>
          </div>

          {authToken ? (
          // If authToken is present, show user icon and dropdown
          <div className="user-dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              <i className="fas fa-user"></i> 
              <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`}></i> 
            </div>
            {showDropdown && (
              <div className="dropdown-content">
                <div className="dropdown-item-user" onClick={handleMyProfile}>My Profile</div>
                <div className="dropdown-item-user" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          // If authToken is not present, show Login link
          <div className='login-signup'>
            <Link to='/login' className='link'>Login</Link>
            <Link to='/signup' className='link'>SignUp</Link>
          </div>
          
        )}
      </div>   
    </div>
  )
}

export default Navbar