import React, { useEffect } from 'react'
import MusicPlayer from '../components/MusicPlayer/MusicPlayer'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar'

import LiveMusic from '../components/LiveMusic/LiveMusic'
import Navbar from '../components/Navbar/Navbar'
import {  useLocation } from 'react-router-dom';

const SingleSongPlay =  () => {
  const location = useLocation();
  const { songList } = location.state || {};
  console.log("hdvjvj",songList);

 
  return (
    <div className='home-page'>
      <Navbar />
      <div className='hero'>
        <div className='left-sideNavbar'>
            <LeftSideNavbar />
        </div>

        <div className='main'>  
              <MusicPlayer
               id={songList._id}
               title={songList.title}
               artistName={songList.artist[0].name}
               relatedSongsId={songList.artist[0].songs}
               image={songList.artist[0].image}
               audioPath={songList.audio_url}
               songList={songList}
               />
        </div>   
      </div>
      {/* <LiveMusic /> */}
    </div>
  )
}

export default SingleSongPlay