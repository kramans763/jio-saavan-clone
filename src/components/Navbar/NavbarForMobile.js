import React from 'react'
import { Link } from 'react-router-dom'
import "./NavbarForMobile.css"

const NavbarForMobile = () => {
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
      <div className='navbar-myProfile'>
          <Link to='/me' className='link'><i class="fa-solid fa-user"></i></Link>
          <Link to='/me' className='link'>My Music</Link>
      </div>
    </div>
  )
}

export default NavbarForMobile