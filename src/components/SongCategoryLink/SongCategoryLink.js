import React from 'react'
import "./SongCategoryLink.css";
import { Link, useLocation } from 'react-router-dom';


const SongCategoryLink = () => {
  const location = useLocation();
  return (
        <div className='song-category'>
            
            <div className='top-page-links'>
              <Link to='/newrelease' className={`link ${location.pathname === '/newrelease' ? 'active' : ''}`}>New Releases</Link>
              <Link to='/charts' className={`link ${location.pathname === '/charts' ? 'active' : ''}`}>Charts</Link>
              <Link to='/playlist' className={`link ${location.pathname === '/playlist' ? 'active' : ''}`}>Top Playlists</Link>
              <Link to='/podcast' className={`link ${location.pathname === '/podcast' ? 'active' : ''}`}>Podcasts</Link>
              <Link to='/artist' className={`link ${location.pathname === '/artist' ? 'active' : ''}`}>Top Artists</Link>
              <Link to='/radio' className={`link ${location.pathname === '/radio' ? 'active' : ''}`}>Radio</Link>
              <Link to='/album' className={`link ${location.pathname === '/album' ? 'active' : ''}`}>Albums</Link>
                {/* <Link to='/newrelease' className='link'>New Releases</Link>
                <Link to='/charts' className='link'>Charts</Link>
                <Link to='/playlist' className='link'>Top Playlists</Link>
                <Link to='/podcast' className='link'>Podcasts</Link>
                <Link to='/artist' className='link'>Top Artists</Link>
                <Link to='/radio' className='link'>Radio</Link> */}
              </div>
              
            
            
        </div>
    
  )
}

export default SongCategoryLink