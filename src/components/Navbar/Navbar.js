import React, { useState,useEffect } from 'react'
import "./Navbar.css";

import { Link, useNavigate } from 'react-router-dom';
import Search from '../../Routes/Search';

const Navbar = (props) => {

  const{onChange,searchWord}=props;

const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
const navigate = useNavigate();
const [showDropdown, setShowDropdown] = useState(false);

// const [searchTerm, setSearchTerm] = useState(''); 


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

async function  handleMoodChange(e){
   let word=e.target.value;
   if(word!=='noValue'){
     console.log(word);
     const response= await fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${word}"}`, {
     headers: {
        'projectId': 'f104bi07c490'
     }
    })
     let data= await response.json();
     let filterdSong=data.data;
     navigate(`/mood`, { state: { filterdSong } });
     console.log("ddddd",data);
  }else{
    e.target.value = 'noValue';
    navigate('/');
  }
  // setSearchTerm(word);
}



  return (
    <div className='navbar'>
      <div className='left-nav'>
        <div className='logo'>
            <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/JioSaavn_Logo.svg" alt='img'/></Link>  
        </div> 
          <div className='nav-links'>
            <div><Link to='/' className='link'>Music</Link></div>
            <div><Link to='/podcast' className='link'>Podcast</Link></div>
            <div><Link to='/underconstruction' className='link'>Go Pro</Link></div>
          </div>   
      </div> 

       <div className="search-bar">
         
           <i className=" searchIcon fas fa-search"></i> 
           <input type="text" 
                 placeholder="Search"
                 value={searchWord}
                 onChange={onChange}
                 />
              
      </div>

      <div className='right-nav'> 
          <div className='music-mood'>
          <select
              // value={searchTerm}
              onChange={handleMoodChange}
              className="select-nav"
            >
              <option value="noValue" className="languages">
                Select Mood
              </option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="romantic">Romantic</option>
            </select>
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