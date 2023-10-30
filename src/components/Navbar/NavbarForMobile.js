import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./NavbarForMobile.css"

const NavbarForMobile = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  useEffect(() => {
    // Check if authToken is in localStorage when the component mounts
    const authTokenFromLocalStorage = localStorage.getItem('authToken');
    if (authTokenFromLocalStorage) {
      setAuthToken(authTokenFromLocalStorage);
    }
  }, []);
  return (
    <div className='navbar-mobile'>
      <div className='navbar-home'>
         <Link to='/' className='link'><i class="fa-solid fa-house"></i></Link>
         <Link to='/' className='link'>Home</Link>
      </div> 
      <div className='navbar-search'>
         <Link to='/underconstruction' className='link'><i class="fa-solid fa-arrow-up-from-bracket"></i></Link>
         <Link to='/underconstruction' className='link'>Go Pro</Link>
      </div>
      <div className='navbar-browse'>
          <Link  to='/underconstruction' className='link'> <i class="fa-brands fa-safari"></i></Link>
          <Link to='/underconstruction' className='link'>Browse</Link>
      </div> 
      {
        authToken?
        <div className='navbar-myProfile'>
        
          <Link to='/me' className='link'><i class="fa-solid fa-user"></i></Link>
          <Link to='/me' className='link'>My Music</Link> 
        </div>:
        <div className='navbar-myProfile'>
          <Link to='/login' className='link'><i class="fa-solid fa-right-to-bracket"></i></Link>
          <Link to='/login' className='link'>Login</Link> 
         </div>
      }
    </div>
  )
}

export default NavbarForMobile