import React from 'react'
import "./LibraryLink.css";
import { Link } from 'react-router-dom';
const LibraryLink = () => {
  return (
    <div className='library-links'>
        <Link to='/me/playlist' className='link'>PlayLists</Link>
        <Link to='/me/songs' className='link'>Songs</Link>
        <Link to='/me/albums' className='link'>Albums</Link>
        <Link to='/me/podcast' className='link'>Podcasts</Link>
        <Link to='/me/artist' className='link'>Artists</Link>
        <Link to='/me/history' className='link'>History</Link>
    </div>
  )
}

export default LibraryLink