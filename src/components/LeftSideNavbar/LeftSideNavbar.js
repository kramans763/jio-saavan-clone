import React from 'react'
import "./LeftSideNavbar.css";
import { Link } from 'react-router-dom';

const LeftSideNavbar = () => {
  const checkAuthToken = () => {
    const authToken = localStorage.getItem('authToken');
    return authToken;
  };
  return (
    <div className='sidebar-container'>
       <div className='browse'>
         <div className='browse-heading'><p>BROWSE</p></div>
         <div className='browse-list'>
           <Link to='/newrelease' className='link'>New Releases</Link>
           <Link to='/charts' className='link'>Top Charts</Link>
           <Link to='/playlist' className='link'>Top Playlists</Link>
           <Link to='/podcast' className='link'>Podcasts</Link>
           <Link to='/artist' className='link'>Top Artists</Link>
           <Link to='/radio' className='link'>Radio</Link>
           </div>
       </div>
       <div className='library'>
          <p>LIBRARY</p>
          <div className='library-list'>
          <Link to='/me' className='link' onClick={() => {
            if (!checkAuthToken()) {
              window.location.href = '/login';
            }
          }}>
            <i className='fas fa-regular fa-heart'></i>Favourite
          </Link>
           
            <Link to='/' className='link'><i className=" fas fa-music"></i>Songs</Link>
            <Link to='/album' className='link'><i className=" fas fa-compact-disc"></i>Albums</Link>
            <Link to='/podcast' className='link'><i className=" fas fa-podcast"></i>Podcasts</Link>
            <Link to='/artist' className='link'><i className=" fas fa-guitar"></i>Artists</Link>
          </div>
       </div>
      <Link to='/underconstruction'><button className='palylist-btn'><i className="fa-thin fa-plus"></i> New<br />Playlist</button> </Link> 
    </div>
  )
}

export default LeftSideNavbar
