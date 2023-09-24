import React from 'react'
import { Link } from 'react-router-dom'
import "./SongCategoryLink.css";

const SongCategoryLink = () => {
  return (
        <div className='song-category'>
            <div className='top-page'>
              <div className='top-page-links'>
                <Link to='/newrelease' className='link'>New Releases</Link>
                <Link to='/charts' className='link'>Charts</Link>
                <Link to='/playlist' className='link'>Top Playlists</Link>
                <Link to='/podcast' className='link'>Podcasts</Link>
                <Link to='/artist' className='link'>Top Artists</Link>
                <Link to='/radio' className='link'>Radio</Link>
              </div>
              <button className='surpriseME'>Surprise Me</button>
            </div>
            {/* <div className='languages'>
                <Link to='/' className='link'>For You</Link>
                <Link to='/' className='link'>Hindi</Link>
                <Link to='/' className='link'>English</Link>
                <Link to='/' className='link'>Bhojpuri</Link>
                <Link to='/' className='link'>Tamil</Link>
                <Link to='/' className='link'>Telugu</Link>
                <Link to='/' className='link'>Punjabi</Link>
                <Link to='/' className='link'>Gujarati</Link>
                <Link to='/' className='link'>Bengali</Link>
                <Link to='/' className='link'>Rajasthani</Link>
                <Link to='/' className='link'>Marathi</Link>
                <Link to='/' className='link'>Kannada</Link>
                <Link to='/' className='link'>Malyalam</Link>
                <Link to='/' className='link'>Haryanvi</Link>
                <Link to='/' className='link'>Odia</Link>
                <Link to='/' className='link'>Assamese</Link>
                <Link to='/' className='link'>Urdu</Link>
            </div> */}
        </div>
    
  )
}

export default SongCategoryLink